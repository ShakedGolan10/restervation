import { Module } from '@nestjs/common';
import { RestaurantsModule } from '../../api/restaurant/rest.module';
import { TablesModule } from '../../api/table/table.module';
import { SlotsModule } from '../../api/slots/slots.module';
import { ReservationsModule } from '../../api/reservation/reservation.module';

@Module({
  imports: [RestaurantsModule, TablesModule, SlotsModule, ReservationsModule],
})
export class ApiModule {}
