import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/prisma.module';
import { HotelModule } from './modules/hotel/hotel.module';
import { RoomModule } from './modules/room/room.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookingModule } from './modules/booking/booking.module';
import { SearchModule } from './modules/search/search.module';
import { ReservationModule } from './modules/reservation/reservation.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    HotelModule,
    RoomModule,
    BookingModule,
    SearchModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
