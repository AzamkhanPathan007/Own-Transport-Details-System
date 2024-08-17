import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'node:path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { PORT, WEB_URL } from 'envConfig';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger(bootstrap.name);
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
  app.listen(PORT || 3000, () => {
    logger.log(`Server started on ${WEB_URL}/vijay/memo`);
  });
}

bootstrap();
