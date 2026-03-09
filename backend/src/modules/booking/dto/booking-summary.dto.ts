import { RoomEntity } from 'src/modules/room/entities/room.entity';
import { ChildrenDto } from './children.dto';

export class BookingSummaryDto {
  valid: boolean;
  checkInDate: Date;
  checkOutDate: Date;
  roomsSelected: RoomEntity[];
  numberOfNights: number;
  adultCount: number;
  children: ChildrenDto;
  baseCost: number;
  promotionsApplied: string[];
  estimatedDiscount: number;
  finalCost: number;
  cancellationPolicy: string;
}
