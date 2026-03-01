import { RoomTypeEnum } from '../enum/room-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RoomDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: '101' })
  number: string;

  @ApiProperty({ example: 100 })
  price: number;

  @ApiProperty({ enum: RoomTypeEnum })
  type: RoomTypeEnum;

  @ApiProperty({ example: 2 })
  capacity: number;

  @ApiProperty({ example: true })
  available: boolean;

  @ApiProperty({ example: '1' })
  hotelId: string;
}
