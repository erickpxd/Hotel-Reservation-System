import { ApiProperty } from '@nestjs/swagger';

export class SearchRoomDto {
  @ApiProperty({ example: '101' })
  id: string;

  @ApiProperty({ example: 'SINGLE_TWO_BEDS' })
  type: string;

  @ApiProperty({ example: 120 })
  price: number;

  @ApiProperty({ example: 2 })
  capacity: number;
}

export class SearchOptionDto {
  @ApiProperty({ example: 'Option 1 (5 People)' })
  optionLabel: string;

  @ApiProperty({ type: [SearchRoomDto] })
  rooms: SearchRoomDto[];

  @ApiProperty({ example: 180 })
  totalPrice: number;
}

export class SearchResultDto {
  @ApiProperty({ example: '64f8a... (ObjectId)' })
  hotelId: string;

  @ApiProperty({ example: 'Hotel Cochabamba Plaza' })
  hotelName: string;
  
  @ApiProperty({ example: 'A hotel in Cochabamba' })
  hotelDescription: string | null;
  
  @ApiProperty({ example: 'Cochabamba' })
  location: string;
  
  @ApiProperty({ type: [SearchOptionDto] })
  options: SearchOptionDto[];
}
