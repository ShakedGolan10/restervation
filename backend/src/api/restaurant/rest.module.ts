import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { DbService } from '../../nest/services/db.service';

@Module({
  controllers: [RestaurantsController],
  providers: [DbService],
  exports: [DbService]
})
export class RestaurantsModule {}
