import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsDate,
  IsArray,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    type: Date,
    example: '2026-03-01',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  checkInDate: Date;

  @ApiProperty({
    type: Date,
    example: '2026-03-02',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  checkOutDate: Date;

  @ApiProperty({
    type: Array,
    example: '[678901... (ObjectId)]',
  })
  @IsArray()
  @IsNotEmpty()
  roomIds: string[];

  @ApiProperty({
    type: Number,
    example: 2,
  })
  @IsNumber()
  @IsOptional()
  people?: number;
}
