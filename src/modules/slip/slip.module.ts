import { Module } from '@nestjs/common';
import { SlipService } from './slip.service';
import { SlipController } from './slip.controller';

@Module({
  controllers: [SlipController],
  providers: [SlipService],
})
export class SlipModule {}
