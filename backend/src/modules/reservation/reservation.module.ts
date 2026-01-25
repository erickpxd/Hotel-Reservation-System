import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/prisma.module';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
