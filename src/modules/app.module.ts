import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { SlipModule } from './slip/slip.module';
import { MemoModule } from './memo/memo.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheLogoService } from '../providers/cacheLogo.service';
import { HttpExceptionFilter } from '../filters/httpException.filter';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import getEnvFilePath from '../config/envStrategy.config';

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
