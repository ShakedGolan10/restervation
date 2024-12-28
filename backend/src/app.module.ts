import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { Middleware } from './middleware';
import { ApiModule } from './nest/modules/api.module';
import { GlobalModule } from './nest/modules/global.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [ DevtoolsModule.register({
    http: process.env.NODE_ENV !== 'production',
  }),GlobalModule, ApiModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
