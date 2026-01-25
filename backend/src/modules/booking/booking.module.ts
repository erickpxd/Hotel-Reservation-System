import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { DatabaseModule } from '../database/prisma.module';

@Module({
  imports: [DatabaseModule],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
