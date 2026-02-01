import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingSummaryDto } from './dto/booking-summary.dto';
import { BookingEntity } from './entities/booking.entity';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AvailabilityQueryDto } from './dto/availability-query.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookings')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
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
    @Request() req,
  ): Promise<BookingEntity> {
    return this.bookingService.createBooking(createBookingDto, req.user.id);
  }

  @Get('/availability')
  @ApiOperation({ summary: 'Check room availability' })
  @ApiResponse({ status: 200, description: 'Room is available.' })
  @ApiResponse({ status: 409, description: 'Room already booked.' })
  async checkAvailability(@Query() query: AvailabilityQueryDto) {
    const { roomId, checkInDate, checkOutDate } = query;
    return this.bookingService.checkAvailability(
      roomId,
      checkInDate,
      checkOutDate,
    );
  }
}
