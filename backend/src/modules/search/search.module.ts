import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/prisma.module';
import { BookingModule } from '../booking/booking.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [DatabaseModule, BookingModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
