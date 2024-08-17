import { Module } from '@nestjs/common';
import { VijayService } from '@vijay/vijay.service';
import { VijayController } from '@vijay/vijay.controller';
import { CachedLogoService } from '@utils/cachedLogo.service';

@Module({
  controllers: [VijayController],
  providers: [VijayService, CachedLogoService],
})
export class VijayModule {}
