import { Controller, Post, Body } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingSummaryDto } from './dto/booking-summary.dto';
import { BookingEntity } from './entities/booking.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('/summary')
  @ApiOperation({ summary: 'Generate booking summary' })
  @ApiResponse({
    status: 200,
    description: 'Return booking summary',
    type: BookingSummaryDto,
  })
  async generateBookingSummary(
    @Body() createBookingDto: CreateBookingDto,
  ): Promise<BookingSummaryDto> {
    return this.bookingService.generateBookingSummary(createBookingDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create booking' })
  @ApiResponse({
    status: 201,
    description: 'Return created booking',
    type: BookingEntity,
  })
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
  ): Promise<BookingEntity> {
    return this.bookingService.createBooking(createBookingDto);
  }
}
