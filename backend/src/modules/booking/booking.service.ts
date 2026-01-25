import { Injectable } from '@nestjs/common';
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

    // call the method to validate the room availability

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

    // call the method to validate the room availability

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
}
