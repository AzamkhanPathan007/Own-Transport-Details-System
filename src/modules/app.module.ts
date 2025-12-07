import { CacheModule } from '@nestjs/cache-manager';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import getEnvFilePath from '../config/envStrategy.config';
import { HttpExceptionFilter } from '../filters/httpException.filter';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { CacheLogoService } from '../providers/cacheLogo.service';
import { AppController } from './app.controller';
import { MemoModule } from './memo/memo.module';
import { SlipModule } from './slip/slip.module';

@Module({
	imports: [
		SlipModule,
		MemoModule,
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			envFilePath: getEnvFilePath(),
		}),
		CacheModule.register({ isGlobal: true }),
	],
	controllers: [AppController],
	providers: [
		CacheLogoService,
		{
			provide: APP_PIPE,
			useFactory: () =>
				new ValidationPipe({
					transform: true,
					whitelist: true,
					forbidNonWhitelisted: true,
					transformOptions: {
						enableImplicitConversion: true,
					},
				}),
		},
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggingInterceptor,
		},
	],
})
export class AppModule {}
