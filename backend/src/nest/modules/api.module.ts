import { Module } from '@nestjs/common';
import { RestaurantsModule } from '../../api/restaurant/rest.module';
import { SlotsModule } from '../../api/slots/slots.module';
import { ReservationsModule } from '../../api/reservation/reservation.module';

@Module({
  imports: [RestaurantsModule, SlotsModule, ReservationsModule],
})
export class ApiModule {}
