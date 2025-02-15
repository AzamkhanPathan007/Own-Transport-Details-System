import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlipModule } from './slip/slip.module';
import { MemoModule } from './memo/memo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SlipModule,
    MemoModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
