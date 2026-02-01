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
import { RoomService } from '../room/room.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roomService: RoomService,
  ) {}

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
    summary.valid = true;
    summary.checkInDate = new Date(createBookingDto.checkInDate);
    summary.checkOutDate = new Date(createBookingDto.checkOutDate);

    const selectedRooms = await this.roomService.getRoomsByIds(
      createBookingDto.roomIds,
    );
    summary.roomsSelected = selectedRooms;

    summary.numberOfNights = this.calculateNumberOfNights(
      createBookingDto.checkInDate,
      createBookingDto.checkOutDate,
    );
    summary.adultCount = createBookingDto.adultCount;
    summary.children = createBookingDto.children;
    summary.baseCost = totalCostOfRooms * summary.numberOfNights;

    const perPersonCost = this.calculatePerPersonCost(
      summary.baseCost,
      createBookingDto.adultCount,
      createBookingDto.children.count,
    );

    const promotions: string[] = [];
    let discountAmount = 0;

    // Child Discounts
    const childDiscounts = this.calculateChildDiscounts(
      createBookingDto.children.ages,
      perPersonCost,
    );
    discountAmount += childDiscounts.discount;
    promotions.push(...childDiscounts.promotions);

    // Group Discount
    const groupDiscount = this.applyGroupDiscount(
      summary.baseCost,
      createBookingDto.adultCount,
    );
    discountAmount += groupDiscount.discount;
    if (groupDiscount.promotion) promotions.push(groupDiscount.promotion);

    // Festive Discount
    const festiveDiscount = await this.applyFestiveDiscount(
      summary.baseCost,
      createBookingDto.checkInDate,
      createBookingDto.roomIds,
    );
    discountAmount += festiveDiscount.discount;
    if (festiveDiscount.promotion) promotions.push(festiveDiscount.promotion);

    summary.promotionsApplied = promotions;
    summary.estimatedDiscount = Number(discountAmount.toFixed(2));

    summary.finalCost = Number((summary.baseCost - discountAmount).toFixed(2));

    if (summary.finalCost < 0) summary.finalCost = 0;

    summary.cancellationPolicy =
      'Cancel 3 days before check-in for a full refund';

    return summary;
  }

  public async createBooking(
    createBookingDto: CreateBookingDto,
    userId: string,
  ): Promise<BookingEntity> {
    this.validateSelectedDates(createBookingDto);

    await this.ensureRoomsAvailability(
      createBookingDto.roomIds,
      createBookingDto.checkInDate,
      createBookingDto.checkOutDate,
    );

    const roomRatePerNight =
      await this.calculateTotalCostOfRooms(createBookingDto);
    const numberOfNights = this.calculateNumberOfNights(
      createBookingDto.checkInDate,
      createBookingDto.checkOutDate,
    );
    const baseCost = roomRatePerNight * numberOfNights;

    // Apply Promotions
    const perPersonCost = this.calculatePerPersonCost(
      baseCost,
      createBookingDto.adultCount,
      createBookingDto.children.count,
    );
    let totalDiscount = 0;

    // Child Discounts
    totalDiscount += this.calculateChildDiscounts(
      createBookingDto.children.ages,
      perPersonCost,
    ).discount;

    // Group Discount
    totalDiscount += this.applyGroupDiscount(
      baseCost,
      createBookingDto.adultCount,
    ).discount;

    // Festive Discount
    totalDiscount += (
      await this.applyFestiveDiscount(
        baseCost,
        createBookingDto.checkInDate,
        createBookingDto.roomIds,
      )
    ).discount;

    let finalCost = Number((baseCost - totalDiscount).toFixed(2));
    if (finalCost < 0) finalCost = 0;

    const createdBooking = await this.prisma.booking.create({
      data: {
        userId,
        roomIds: createBookingDto.roomIds,
        checkInDate: createBookingDto.checkInDate,
        checkOutDate: createBookingDto.checkOutDate,
        totalCost: finalCost,
        status: BookingStatus.CONFIRMED,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const rooms = await this.roomService.getRoomsByIds(
      createBookingDto.roomIds,
    );

    return {
      ...createdBooking,
      rooms,
    };
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

  public async getReservedRoomIds(
    start: Date,
    end: Date,
  ): Promise<Set<string>> {
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

    return totalPriceOfRooms;
  }

  private calculatePerPersonCost(
    baseCost: number,
    adultCount: number,
    childCount: number,
  ): number {
    const totalPeople = adultCount + childCount;
    const effectivePeople = totalPeople > 0 ? totalPeople : 1;
    return baseCost / effectivePeople;
  }

  private calculateChildDiscounts(
    childrenAges: number[],
    perPersonCost: number,
  ): { discount: number; promotions: string[] } {
    const promotions: string[] = [];
    let totalDiscount = 0;

    // Rule 1: Children < 5 Free
    const childrenUnder5 = childrenAges.filter((age) => age < 5).length;
    if (childrenUnder5 > 0) {
      const discount = childrenUnder5 * perPersonCost;
      totalDiscount += discount;
      promotions.push(
        `Children < 5 Free (${childrenUnder5} children, saved ${discount.toFixed(
          2,
        )})`,
      );
    }

    // Rule 1.1: Children >= 5 Pay Half Price
    const children5OrOlder = childrenAges.filter((age) => age >= 5).length;
    if (children5OrOlder > 0) {
      const discount = children5OrOlder * perPersonCost * 0.5;
      totalDiscount += discount;
      promotions.push(
        `Children >= 5 Half Price (${children5OrOlder} children, saved ${discount.toFixed(
          2,
        )})`,
      );
    }

    return { discount: totalDiscount, promotions };
  }

  private applyGroupDiscount(
    baseCost: number,
    adultCount: number,
  ): { discount: number; promotion?: string } {
    if (adultCount >= 8) {
      const discount = baseCost * 0.15;
      return { discount, promotion: 'Group Discount 15%' };
    }
    return { discount: 0 };
  }

  private async applyFestiveDiscount(
    baseCost: number,
    checkInDate: Date,
    roomIds: string[],
  ): Promise<{ discount: number; promotion?: string }> {
    if (roomIds.length > 0) {
      const firstRoomId = roomIds[0];
      const hotel = await this.prisma.hotel.findFirst({
        where: { rooms: { some: { id: firstRoomId } } },
        include: { festiveCalendars: true },
      });

      if (hotel) {
        const checkIn = new Date(checkInDate);
        checkIn.setHours(0, 0, 0, 0);

        const festiveDate = hotel.festiveCalendars.find((f) => {
          const fDate = new Date(f.date);
          fDate.setHours(0, 0, 0, 0);
          return fDate.getTime() === checkIn.getTime();
        });

        if (festiveDate) {
          const discount = baseCost * (festiveDate.discountPercentage / 100);
          return {
            discount,
            promotion: `Festive Discount ${festiveDate.description} (${festiveDate.discountPercentage}%)`,
          };
        }
      }
    }
    return { discount: 0 };
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
