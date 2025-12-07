import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.useStaticAssets(join('public'));

	app.setBaseViewsDir(join('views'));

	app.setViewEngine('ejs');

	await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
