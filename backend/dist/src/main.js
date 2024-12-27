"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./nest/modules/app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // if (process.env.NODE_ENV === 'production') {
    //   app.useStaticAssets(path.resolve(__dirname, 'public')); // Serve static files
    // } else {
    //   app.enableCors({
    //     origin: [
    //       'http://127.0.0.1:3000',
    //       'http://localhost:3000',
    //       'http://localhost:3030',
    //     ],
    //     credentials: true, // Allow credentials like cookies or headers
    //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allowed HTTP methods
    //     allowedHeaders: 'Content-Type, Authorization', // Allowed headers
    //   });
    // }
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true, // Strip unknown properties
        forbidNonWhitelisted: true, // Throw error on unknown properties
        transform: true, // Automatically transform payloads to DTOs
    }));
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT || 3030);
}
bootstrap();
