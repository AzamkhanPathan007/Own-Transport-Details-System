import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlipModule } from './slip/slip.module';
import { MemoModule } from './memo/memo.module';

@Module({
  imports: [SlipModule, MemoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
