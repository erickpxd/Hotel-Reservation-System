import { RoomEntity } from 'src/modules/room/entities/room.entity';

export class BookingSummaryDto {
  valid: boolean;
  checkInDate: Date;
  checkOutDate: Date;
  roomsSelected: RoomEntity[];
  numberOfNights: number;
  baseCost: number;
  promotionsApplied: string[];
  estimatedDiscount: number;
  finalCost: number;
  cancellationPolicy: string;
}
