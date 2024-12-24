import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { DbModule } from './db.module'
import { Middleware } from '../middleware'
@Module({
  imports: [DbModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Middleware)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}