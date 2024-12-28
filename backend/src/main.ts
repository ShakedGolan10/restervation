import { NestFactory } from '@nestjs/core';
import * as path from 'path';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // if (process.env.NODE_ENV === 'production') {
  //   app.useStaticAssets(path.resolve(__dirname, 'public')); // Serve static files
  // } else {
  //   app.enableCors({
  //     origin: [
  //       'http://localhost:3000',
  //       'http://localhost:3030',
  //     ],
  //     credentials: true, // Allow credentials like cookies or headers
  //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allowed HTTP methods
  //     allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  //   });
  // }
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip unknown properties
    forbidNonWhitelisted: true, // Throw error on unknown properties
    transform: true, // Automatically transform payloads to DTOs
  }));
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3030);
}
bootstrap();
