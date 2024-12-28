import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { Middleware } from './middleware';
import { ApiModule } from './nest/modules/api.module';
import { GlobalModule } from './nest/modules/global.module';

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
