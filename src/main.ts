import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'node:path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
// import { RedisConnector } from 'database/redisConnector';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //   redisInstance = RedisConnector.getInstance();
  // redisInstance.connect();
  app.useStaticAssets(join('public'));
  app.setBaseViewsDir(join('views'));
  app.setViewEngine('ejs');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      forbidUnknownValues: true,
      whitelist: true,
    }),
  );
  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000/vijay/memo');
  });
}

bootstrap();
