import { Module } from '@nestjs/common';
import { OtsService } from '@ots/ots.service';
import { OtsController } from '@ots/ots.controller';
import { CachedLogoService } from '@utils/cachedLogo.service';

@Module({
  controllers: [OtsController],
  providers: [OtsService, CachedLogoService],
})
export class OtsModule {}
