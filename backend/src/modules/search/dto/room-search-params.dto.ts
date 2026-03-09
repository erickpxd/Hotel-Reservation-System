import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, Min } from 'class-validator';

export class RoomSearchParamsDto {
  @ApiProperty({
    description: 'Start date of the stay (YYYY-MM-DD)',
    example: '2026-02-01',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'End date of the stay (YYYY-MM-DD)',
    example: '2026-02-05',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'Number of people to accommodate',
    example: 5,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  adultsCount: number;

  @ApiProperty({
    description: 'Number of children to accommodate',
    example: 2,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  childrenCount: number;
}
