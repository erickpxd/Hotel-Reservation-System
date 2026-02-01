import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { DatabaseModule } from '../database/prisma.module';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [DatabaseModule, RoomModule],
  providers: [BookingService],
  controllers: [BookingController],
  exports: [BookingService],
})
export class BookingModule {}
