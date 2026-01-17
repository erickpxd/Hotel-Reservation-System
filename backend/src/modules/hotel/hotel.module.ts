import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { DatabaseModule } from '../database/prisma.module';

@Module({
  imports: [DatabaseModule],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
