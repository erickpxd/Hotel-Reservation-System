import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingSummaryDto } from './dto/booking-summary.dto';
import { BookingEntity } from './entities/booking.entity';
import { BookingStatus } from 'generated/prisma/enums';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  public async generateBookingSummary(
    createBookingDto: CreateBookingDto,
  ): Promise<BookingSummaryDto> {
    this.validateSelectedDates(createBookingDto);

    await this.ensureRoomsAvailability(
      createBookingDto.roomIds,
      createBookingDto.checkInDate,
      createBookingDto.checkOutDate,
    );

    const totalCostOfRooms =
      await this.calculateTotalCostOfRooms(createBookingDto);

    const summary = new BookingSummaryDto();
    summary.valid = true; // call validate method
    summary.checkInDate = new Date(createBookingDto.checkInDate);
    summary.checkOutDate = new Date(createBookingDto.checkOutDate);

    // summary.roomsSelected = createBookingDto.roomIds;

    summary.numberOfNights = this.calculateNumberOfNights(
      createBookingDto.checkInDate,
      createBookingDto.checkOutDate,
    );
    summary.baseCost = totalCostOfRooms;
    summary.promotionsApplied = []; // for now
    summary.estimatedDiscount = 0; // for now
    summary.finalCost = summary.baseCost; // for now
    summary.cancellationPolicy =
      'Cancel 3 days before check-in for a full refund';

    return summary;
  }

  public async createBooking(
    createBookingDto: CreateBookingDto,
  ): Promise<BookingEntity> {
    this.validateSelectedDates(createBookingDto);

    await this.ensureRoomsAvailability(
      createBookingDto.roomIds,
      createBookingDto.checkInDate,
      createBookingDto.checkOutDate,
    );

    const totalCostOfRooms =
      await this.calculateTotalCostOfRooms(createBookingDto);

    return await this.prisma.booking.create({
      data: {
        userId: '69712cfc1eb777b7399e7f8a', // for now
        roomIds: createBookingDto.roomIds,
        checkInDate: createBookingDto.checkInDate,
        checkOutDate: createBookingDto.checkOutDate,
        totalCost: totalCostOfRooms,
        status: BookingStatus.CONFIRMED,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  public validateSelectedDates(createBookingDto: CreateBookingDto): void {
    if (createBookingDto.checkInDate >= createBookingDto.checkOutDate) {
      throw new Error('Check-in date must be before check-out date');
    }

    if (createBookingDto.checkInDate < new Date()) {
      throw new Error('Check-in date must be after today');
    }
  }

  public async checkAvailability(
    roomId: string,
    checkInDate: string,
    checkOutDate: string,
  ): Promise<{ available: boolean }> {
    const { start, end } = this.parseAndValidateDates(
      checkInDate,
      checkOutDate,
    );
    await this.ensureAvailability(roomId, start, end);
    return { available: true };
  }

  public async getReservedRoomIds(start: Date, end: Date): Promise<Set<string>> {
    const bookings = await this.prisma.booking.findMany({
      where: {
        ...this.buildOverlapWhere(start, end),
      },
      select: {
        roomIds: true,
      },
    });

    return new Set(bookings.flatMap((booking) => booking.roomIds));
  }

  public parseAndValidateDates(
    checkInDate: string,
    checkOutDate: string,
  ): { start: Date; end: Date } {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new BadRequestException('Invalid check-in or check-out date.');
    }

    if (end <= start) {
      throw new BadRequestException(
        'Check-out date must be after check-in date.',
      );
    }

    return { start, end };
  }

  private async ensureRoomsAvailability(
    roomIds: string[],
    start: Date,
    end: Date,
  ): Promise<void> {
    await Promise.all(
      roomIds.map((roomId) => this.ensureAvailability(roomId, start, end)),
    );
  }

  private async ensureAvailability(
    roomId: string,
    start: Date,
    end: Date,
  ): Promise<void> {
    const conflict = await this.prisma.booking.findFirst({
      where: {
        roomIds: {
          has: roomId,
        },
        ...this.buildOverlapWhere(start, end),
      },
    });

    if (conflict) {
      throw new ConflictException(
        'Room is already booked for the selected period.',
      );
    }
  }

  private async calculateTotalCostOfRooms(
    createBookingDto: CreateBookingDto,
  ): Promise<number> {
    const numberOfNights = this.calculateNumberOfNights(
      createBookingDto.checkInDate,
      createBookingDto.checkOutDate,
    );

    const roomPrices = await Promise.all(
      createBookingDto.roomIds.map(async (roomId) => {
        const hotel = await this.prisma.hotel.findFirst({
          where: { rooms: { some: { id: roomId } } },
          select: {
            rooms: {
              select: {
                id: true,
                price: true,
              },
            },
          },
        });

        const room = hotel?.rooms.find((r) => r.id === roomId);

        return room ? room.price : 0;
      }),
    );

    const totalPriceOfRooms = roomPrices.reduce((total, price) => {
      return total + price;
    }, 0);

    return numberOfNights * totalPriceOfRooms;
  }

  private calculateNumberOfNights(checkIn: Date, checkOut: Date): number {
    const numberOfNights =
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24);
    return numberOfNights;
  }

  private buildOverlapWhere(start: Date, end: Date) {
    return {
      checkInDate: {
        lt: end,
      },
      checkOutDate: {
        gt: start,
      },
    };
  }
}
