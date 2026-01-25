import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from '../../../generated/prisma/client';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const { roomId, startDate, endDate, guestName } = createReservationDto;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new BadRequestException('Invalid startDate or endDate.');
    }

    if (end <= start) {
      throw new BadRequestException('endDate must be after startDate.');
    }

    const hotel = await this.prisma.hotel.findFirst({
      where: {
        rooms: {
          some: { id: roomId },
        },
      },
    });

    if (!hotel) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }

    const conflict = await this.prisma.reservation.findFirst({
      where: {
        roomId,
        startDate: {
          lt: end,
        },
        endDate: {
          gt: start,
        },
      },
    });

    if (conflict) {
      throw new ConflictException(
        'Room is already booked for the selected period.',
      );
    }

    return this.prisma.reservation.create({
      data: {
        roomId,
        hotelId: hotel.id,
        startDate: start,
        endDate: end,
        guestName,
      },
    });
  }
}
