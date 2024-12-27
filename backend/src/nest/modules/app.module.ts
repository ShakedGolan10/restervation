import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GlobalModule } from './global.module';
import { Middleware } from '../../middleware';
import { ApiModule } from './api.module';
@Module({
  imports: [GlobalModule, ApiModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
