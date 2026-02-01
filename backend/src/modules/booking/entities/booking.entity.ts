import { BookingStatus } from 'generated/prisma/client';
import { RoomEntity } from 'src/modules/room/entities/room.entity';

export class BookingEntity {
  id: string;
  userId: string;
  rooms: RoomEntity[];
  checkInDate: Date;
  checkOutDate: Date;
  totalCost: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}
