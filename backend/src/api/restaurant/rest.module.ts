import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { GlobalModule } from '../../nest/modules/global.module';

@Module({
  controllers: [RestaurantsController],
  providers: [],
})
export class RestaurantsModule {}
