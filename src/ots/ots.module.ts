import { Module } from '@nestjs/common';
import { OtsService } from '@ots/ots.service';
import { OtsController } from '@ots/ots.controller';

@Module({
  controllers: [OtsController],
  providers: [OtsService],
})
export class OtsModule {}
