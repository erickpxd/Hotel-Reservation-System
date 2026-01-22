import { Decimal } from '@prisma/client/runtime/index-browser';

import { RoomTypeEnum } from '../enum/room-type.enum';

export interface RoomEntity {
  id: string;
  number: string;
  price: Decimal;
  type: RoomTypeEnum;
  capacity: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}
