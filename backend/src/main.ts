import { NestFactory } from '@nestjs/core';
import * as path from 'path';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true,
  });
  if (process.env.NODE_ENV === 'production') {
    const publicPath = path.resolve(__dirname, '..', 'public');
    // Serve static assets (React build)
    app.useStaticAssets(publicPath);

    // Handle frontend routes by serving index.html
    app.use('*', (req: Request, res: Response, next) => {
      if (!req.originalUrl.startsWith('/api')) res.sendFile(path.resolve(publicPath, 'index.html'));
      next();
    });
  } else {
    app.enableCors({
      origin: ['http://localhost:3000', 'http://localhost:3030'],
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3030);
}

bootstrap();