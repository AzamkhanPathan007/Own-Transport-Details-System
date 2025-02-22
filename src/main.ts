import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { join } from 'node:path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join('public'));

  app.setBaseViewsDir(join('views'));

  app.setViewEngine('ejs');

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  throw err;
});
