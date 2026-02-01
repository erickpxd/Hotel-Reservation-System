import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from '../database/prisma.service';
import { Room } from '../../../generated/prisma/client';
import { randomUUID } from 'crypto';
import { RoomEntity } from './entities/room.entity';
@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const { hotelId, ...roomData } = createRoomDto;
    const hotel = await this.prisma.hotel.findUnique({
      where: { id: hotelId },
    });
    if (!hotel) {
      throw new NotFoundException(`Hotel with ID ${hotelId} not found`);
    }
    const newRoom: Room = {
      id: randomUUID(),
      ...roomData,
      available: roomData.available ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.prisma.hotel.update({
      where: { id: hotelId },
      data: {
        rooms: {
          push: newRoom,
        },
      },
    });
    return newRoom;
  }
  async findAll(): Promise<Room[]> {
    const hotels = await this.prisma.hotel.findMany();
    return hotels.flatMap((hotel) => hotel.rooms);
  }
  async findOne(id: string): Promise<Room> {
    const hotel = await this.prisma.hotel.findFirst({
      where: {
        rooms: {
          some: {
            id: id,
          },
        },
      },
    });
    if (!hotel) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    const room = hotel.rooms.find((r) => r.id === id);
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }
  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const { hotelId, ...roomData } = updateRoomDto;
    const currentHotel = await this.prisma.hotel.findFirst({
      where: {
        rooms: {
          some: { id: id },
        },
      },
    });
    if (!currentHotel) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    const roomIndex = currentHotel.rooms.findIndex((r) => r.id === id);
    if (roomIndex === -1) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    const currentRoom = currentHotel.rooms[roomIndex];
    const updatedRoom: Room = {
      ...currentRoom,
      ...roomData,
      updatedAt: new Date(),
    };
    if (hotelId && hotelId !== currentHotel.id) {
      const newHotel = await this.prisma.hotel.findUnique({
        where: { id: hotelId },
      });
      if (!newHotel)
        throw new NotFoundException(
          `Target Hotel with ID ${hotelId} not found`,
        );
      await this.prisma.hotel.update({
        where: { id: currentHotel.id },
        data: {
          rooms: {
            set: currentHotel.rooms.filter((r) => r.id !== id),
          },
        },
      });
      // Add to new hotel
      await this.prisma.hotel.update({
        where: { id: hotelId },
        data: {
          rooms: {
            push: updatedRoom,
          },
        },
      });

      return updatedRoom;
    }

    currentHotel.rooms[roomIndex] = updatedRoom;
    await this.prisma.hotel.update({
      where: { id: currentHotel.id },
      data: {
        rooms: {
          set: currentHotel.rooms,
        },
      },
    });
    return updatedRoom;
  }
  async remove(id: string): Promise<Room> {
    const hotel = await this.prisma.hotel.findFirst({
      where: {
        rooms: {
          some: { id: id },
        },
      },
    });
    if (!hotel) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    const roomToRemove = hotel.rooms.find((r) => r.id === id);
    if (!roomToRemove)
      throw new NotFoundException(`Room with ID ${id} not found`);
    await this.prisma.hotel.update({
      where: { id: hotel.id },
      data: {
        rooms: {
          set: hotel.rooms.filter((r) => r.id !== id),
        },
      },
    });
    return roomToRemove;
  }

  async getRoomsByIds(ids: string[]): Promise<RoomEntity[]> {
    const hotels = await this.prisma.hotel.findMany({
      where: {
        rooms: {
          some: {
            id: {
              in: ids,
            },
          },
        },
      },
      select: {
        rooms: true,
      },
    });

    return hotels
      .flatMap((hotel) => hotel.rooms)
      .filter((room) => ids.includes(room.id)) as unknown as RoomEntity[];
  }
}
