import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationsService } from './reservation.service';

@Module({
  controllers: [ReservationController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
