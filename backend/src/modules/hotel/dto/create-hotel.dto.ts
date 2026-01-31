import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateHotelDto {
  @ApiProperty({
    description: 'The name of the hotel',
    example: 'Grand Plaza Hotel',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The address of the hotel',
    example: '123 Main St, New York, NY',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'A brief description of the hotel',
    example: 'A luxury hotel in the heart of the city.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
