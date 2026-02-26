import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingSummaryDto } from './dto/booking-summary.dto';
import { BookingEntity } from './entities/booking.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AvailabilityQueryDto } from './dto/availability-query.dto';
import { AuthGuard } from '@nestjs/passport';
import { BookingDto } from './dto/booking.dto';

@Controller('bookings')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('/summary')
  @ApiOperation({ summary: 'Generate booking summary' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: 'Return created booking',
    type: BookingEntity,
  })
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @Request() req,
  ): Promise<BookingDto> {
    return this.bookingService.createBooking(createBookingDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'List user bookings' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Return user bookings.' })
  listUserBookings(@Request() req) {
    return this.bookingService.listUserBookings(req.user.id);
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

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel booking (rule of 3 days)' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Booking canceled.' })
  @ApiResponse({ status: 400, description: 'Cancelation rejected by policy.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  cancelBooking(@Param('id') id: string, @Request() req) {
    return this.bookingService.cancelBooking(id, req.user.id);
  }
}
