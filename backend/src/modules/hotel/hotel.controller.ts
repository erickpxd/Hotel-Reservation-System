import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@ApiTags('hotels')
@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new hotel' })
  @ApiResponse({
    status: 201,
    description: 'The hotel has been successfully created.',
  })
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelService.create(createHotelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all hotels' })
  @ApiResponse({ status: 200, description: 'Return all hotels.' })
  findAll() {
    return this.hotelService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a hotel by id' })
  @ApiResponse({ status: 200, description: 'Return a hotel.' })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  findOne(@Param('id') id: string) {
    return this.hotelService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a hotel' })
  @ApiResponse({
    status: 200,
    description: 'The hotel has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelService.update(id, updateHotelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a hotel' })
  @ApiResponse({
    status: 200,
    description: 'The hotel has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  remove(@Param('id') id: string) {
    return this.hotelService.remove(id);
  }
}
