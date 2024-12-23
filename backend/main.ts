import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import * as path from 'path';
import { AppModule } from './nest/modules/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Environment-specific configurations
  if (process.env.NODE_ENV === 'production') {
    app.useStaticAssets(path.resolve(__dirname, 'public')); // Serve static files
  } else {
    app.enableCors({
      origin: [
        'http://127.0.0.1:3000',
        'http://localhost:3000',
        'http://localhost:3030',
      ],
      credentials: true, // Allow credentials like cookies or headers
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allowed HTTP methods
      allowedHeaders: 'Content-Type, Authorization', // Allowed headers
    });
  }

  await app.listen(3000);
}
bootstrap();
