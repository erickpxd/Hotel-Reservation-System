import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from '../../../generated/prisma/client';

@Injectable()
export class HotelService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    return this.prisma.hotel.create({
      data: createHotelDto,
    });
  }

  async findAll(): Promise<Hotel[]> {
    return this.prisma.hotel.findMany();
  }

  async findOne(id: string): Promise<Hotel> {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id },
    });
    
    if (!hotel) {
        throw new NotFoundException(`Hotel with ID ${id} not found`);
    }

    return hotel;
  }

  async update(id: string, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
    await this.findOne(id);

    return this.prisma.hotel.update({
      where: { id },
      data: updateHotelDto,
    });
  }

  async remove(id: string): Promise<Hotel> {
    await this.findOne(id);
    
    return this.prisma.hotel.delete({
      where: { id },
    });
  }
}
