import { RoomEntity } from 'src/modules/room/entities/room.entity';

export interface HotelEntity {
  id: string;
  name: string;
  address: string;
  description: string;
  rooms: RoomEntity[];
  createdAt: Date;
  updatedAt: Date;
}
