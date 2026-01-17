import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from '../database/prisma.service';
import { Room } from '../../../generated/prisma/client';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const { hotelId, ...roomData } = createRoomDto;

    try {
      return await this.prisma.room.create({
        data: {
          ...roomData,
          hotel: {
            connect: { id: hotelId },
          },
        },
        include: {
          hotel: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Hotel with ID ${hotelId} not found`);
      }
      throw error;
    }
  }

  async findAll(): Promise<Room[]> {
    return this.prisma.room.findMany({
      include: { hotel: true },
    });
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.prisma.room.findUnique({
      where: { id },
      include: { hotel: true },
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }

    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    await this.findOne(id);

    const { hotelId, ...roomData } = updateRoomDto;

    try {
      const data: any = { ...roomData };

      if (hotelId) {
        data.hotel = {
          connect: { id: hotelId },
        };
      }

      return this.prisma.room.update({
        where: { id },
        data: data,
        include: { hotel: true },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Hotel with ID ${hotelId} not found`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<Room> {
    await this.findOne(id);

    return this.prisma.room.delete({
      where: { id },
    });
  }
}
