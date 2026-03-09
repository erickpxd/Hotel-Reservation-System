import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsDate,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { ChildrenDto } from './children.dto';

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
  @IsNotEmpty()
  adultCount: number;

  @ApiProperty({
    type: Object,
    example: { count: 1, ages: [3] },
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ChildrenDto)
  children: ChildrenDto;
}
