import { BookingStatus } from 'generated/prisma/client';

export class BookingEntity {
  id: string;
  userId: string;
  roomIds: string[];
  checkInDate: Date;
  checkOutDate: Date;
  totalCost: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}
