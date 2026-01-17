import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/prisma.module';
import { HotelModule } from './modules/hotel/hotel.module';
import { RoomModule } from './modules/room/room.module';

@Module({
  imports: [DatabaseModule, HotelModule, RoomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
