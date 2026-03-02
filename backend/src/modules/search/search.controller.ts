import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dto/search-query.dto';
import { SearchResultDto } from './dto/search-result.dto';
import { RoomDto } from '../room/dto/room.dto';
import { RoomSearchParamsDto } from './dto/room-search-params.dto';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Search for room combinations' })
  @ApiResponse({
    status: 200,
    description: 'Return search proposals.',
    type: [SearchResultDto],
  })
  search(@Query() query: SearchQueryDto): Promise<SearchResultDto[]> {
    return this.searchService.search(query);
  }

  @Get('available-rooms/:hotelId')
  @ApiOperation({ summary: 'Get available rooms for a hotel' })
  @ApiResponse({
    status: 200,
    description: 'Return available rooms from a hotel.',
    type: [RoomDto],
  })
  findAvailableRoomsAtTheHotel(
    @Param('hotelId') hotelId: string,
    @Query() query: RoomSearchParamsDto,
  ): Promise<RoomDto[]> {
    return this.searchService.findAvailableRoomsAtTheHotel(hotelId, query);
  }
}
