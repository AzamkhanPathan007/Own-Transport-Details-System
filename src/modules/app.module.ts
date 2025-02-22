import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { SlipModule } from './slip/slip.module';
import { MemoModule } from './memo/memo.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheLogoService } from '../providers/cacheLogo.service';
import { HttpExceptionFilter } from '../filters/httpException.filter';

@Module({
  imports: [
    SlipModule,
    MemoModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
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
  ],
})
export class AppModule {}
