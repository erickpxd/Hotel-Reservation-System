import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
  Min,
} from 'class-validator';

export class SearchQueryDto {
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
  peopleCount: number;

  @ApiProperty({
    description: 'City to filter hotels by (matches address)',
    example: 'Cochabamba',
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'Minimum total price for the stay',
    example: 150,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiProperty({
    description: 'Maximum total price for the stay',
    example: 400,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;
}
