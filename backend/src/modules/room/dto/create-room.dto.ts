import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { RoomType } from '../../../../generated/prisma/client';

export class CreateRoomDto {
  @ApiProperty({
    description: 'The number/identifier of the room',
    example: '101',
  })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    description: 'Price per night',
    example: 150.00,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Type of the room',
    enum: RoomType,
    example: RoomType.SINGLE_ONE_BED,
  })
  @IsEnum(RoomType)
  @IsNotEmpty()
  type: RoomType;

  @ApiProperty({
    description: 'Usage capacity of the room',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @ApiProperty({
    description: 'Availability status of the room',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @ApiProperty({
    description: 'The ID of the hotel this room belongs to',
    example: '64f8a... (ObjectId)',
  })
  @IsMongoId()
  @IsNotEmpty()
  hotelId: string;
}
