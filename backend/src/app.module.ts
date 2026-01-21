import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/prisma.module';
import { HotelModule } from './modules/hotel/hotel.module';
import { RoomModule } from './modules/room/room.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule, HotelModule, RoomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
