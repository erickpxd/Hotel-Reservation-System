import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class AvailabilityQueryDto {
  @ApiProperty({
    description: 'Room identifier (UUID stored inside the hotel.rooms array)',
    example: 'f1f7d2a2-2a3a-4c70-9dfe-43f835d7a0b4',
  })
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({
    description: 'Check-in date (YYYY-MM-DD)',
    example: '2026-03-01',
  })
  @IsDateString()
  checkInDate: string;

  @ApiProperty({
    description: 'Check-out date (YYYY-MM-DD)',
    example: '2026-03-05',
  })
  @IsDateString()
  checkOutDate: string;
}
