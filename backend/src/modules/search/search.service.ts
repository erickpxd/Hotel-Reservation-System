import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { BookingService } from '../booking/booking.service';
import { SearchQueryDto } from './dto/search-query.dto';
import { SearchResultDto } from './dto/search-result.dto';
import { Room } from '../../../generated/prisma/client';
import { RoomDto } from '../room/dto/room.dto';
import { RoomTypeEnum } from '../room/enum/room-type.enum';
import { RoomSearchParamsDto } from './dto/room-search-params.dto';

@Injectable()
export class SearchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bookingService: BookingService,
  ) {}

  async search(query: SearchQueryDto): Promise<SearchResultDto[]> {
    const { startDate, endDate, peopleCount, city, minPrice, maxPrice } = query;

    const { start, end } = this.bookingService.parseAndValidateDates(
      startDate,
      endDate,
    );
    const nights = this.calculateNights(start, end);

    const hotels = await this.prisma.hotel.findMany({
      where: city
        ? {
            address: {
              contains: city,
              mode: 'insensitive',
            },
          }
        : undefined,
    });

    const reservedRoomIds = await this.bookingService.getReservedRoomIds(
      start,
      end,
    );

    const results: SearchResultDto[] = [];

    for (const hotel of hotels) {
      const availableRooms = hotel.rooms.filter(
        (room) => room.available !== false && !reservedRoomIds.has(room.id),
      );
      if (availableRooms.length === 0) continue;

      const pricedRooms = this.filterRoomsByMaxPrice(
        availableRooms,
        maxPrice,
        nights,
      );
      if (pricedRooms.length === 0) continue;

      const combinations = this.findCombinations({
        rooms: pricedRooms,
        peopleCount,
        nights,
        minPrice,
        maxPrice,
        limit: 10,
      });

      combinations.forEach((combo, index) => {
        const totalPrice = combo.totalPrice;
        results.push({
          hotelId: hotel.id,
          hotelName: hotel.name,
          location: hotel.address,
          optionLabel: `Opcao ${index + 1} (${peopleCount} Pessoas)`,
          rooms: combo.rooms.map((room) => ({
            id: room.id,
            type: room.type,
            price: room.price,
            capacity: room.capacity,
          })),
          totalPrice,
          available: true,
        });
      });
    }

    return results;
  }

  private calculateNights(start: Date, end: Date): number {
    const msInDay = 1000 * 60 * 60 * 24;
    return Math.ceil((end.getTime() - start.getTime()) / msInDay);
  }

  private filterRoomsByMaxPrice(
    rooms: Room[],
    maxPrice: number | undefined,
    nights: number,
  ): Room[] {
    if (maxPrice === undefined) return rooms;

    const maxRoomPrice = maxPrice / nights;
    return rooms.filter((room) => room.price <= maxRoomPrice);
  }

  private findCombinations({
    rooms,
    peopleCount,
    nights,
    minPrice,
    maxPrice,
    limit,
  }: {
    rooms: Room[];
    peopleCount: number;
    nights: number;
    minPrice?: number;
    maxPrice?: number;
    limit: number;
  }): Array<{ rooms: Room[]; totalPrice: number }> {
    const sortedRooms = [...rooms].sort((a, b) => a.price - b.price);
    const results: Array<{ rooms: Room[]; totalPrice: number }> = [];

    const dfs = (
      startIndex: number,
      currentRooms: Room[],
      capacitySum: number,
      priceSum: number,
    ) => {
      if (results.length >= limit) return;

      if (capacitySum >= peopleCount) {
        const totalPrice = priceSum * nights;
        if (
          (minPrice === undefined || totalPrice >= minPrice) &&
          (maxPrice === undefined || totalPrice <= maxPrice)
        ) {
          results.push({ rooms: [...currentRooms], totalPrice });
        }
        return;
      }

      for (let i = startIndex; i < sortedRooms.length; i += 1) {
        const room = sortedRooms[i];
        const nextPriceSum = priceSum + room.price;

        if (maxPrice !== undefined && nextPriceSum * nights > maxPrice) {
          continue;
        }

        dfs(
          i + 1,
          [...currentRooms, room],
          capacitySum + room.capacity,
          nextPriceSum,
        );

        if (results.length >= limit) return;
      }
    };

    dfs(0, [], 0, 0);
    return results;
  }

  public async findAvailableRoomsAtTheHotel(
    hotelId: string,
    query: RoomSearchParamsDto,
  ): Promise<RoomDto[]> {
    const { startDate, endDate, adultsCount, childrenCount } = query;

    const hotel = await this.prisma.hotel.findUnique({
      where: {
        id: hotelId,
      },
    });

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    const { start, end } = this.bookingService.parseAndValidateDates(
      startDate,
      endDate,
    );

    const reservedRoomIds = await this.bookingService.getReservedRoomIds(
      start,
      end,
    );

    const availableRooms = hotel.rooms.filter(
      (room) => room.available !== false && !reservedRoomIds.has(room.id),
    );

    return availableRooms.map((room) => ({
      id: room.id,
      number: room.number,
      price: room.price,
      type: room.type as RoomTypeEnum,
      capacity: room.capacity,
      available: room.available,
      hotelId,
    }));
  }
}
