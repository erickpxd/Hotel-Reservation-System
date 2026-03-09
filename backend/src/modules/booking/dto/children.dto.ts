import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class ChildrenDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  count: number;

  @ApiProperty({ type: [Number], example: [3] })
  @IsArray()
  ages: number[];
}
