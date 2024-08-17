import { Module } from '@nestjs/common';
import { VijayService } from '@vijay/vijay.service';
import { VijayController } from '@vijay/vijay.controller';

@Module({
  controllers: [VijayController],
  providers: [VijayService],
})
export class VijayModule {}
