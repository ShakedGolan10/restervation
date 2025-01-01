import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { TablesService } from '../table/table.service';

@Module({
  controllers: [RestaurantsController],
  providers: [TablesService]
})
export class RestaurantsModule {}
