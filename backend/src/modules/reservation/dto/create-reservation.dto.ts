import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({
    description: 'Room identifier (UUID stored inside the hotel.rooms array)',
    example: 'f1f7d2a2-2a3a-4c70-9dfe-43f835d7a0b4',
  })
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({
    description: 'Start date (YYYY-MM-DD)',
    example: '2026-02-01',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'End date (YYYY-MM-DD)',
    example: '2026-02-05',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'Guest name',
    example: 'Maria Lopez',
    required: false,
  })
  @IsOptional()
  @IsString()
  guestName?: string;
}
