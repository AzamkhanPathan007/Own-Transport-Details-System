import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { OtsModule } from '@ots/ots.module';
import { VijayModule } from '@vijay/vijay.module';

@Module({
  imports: [
    OtsModule,
    VijayModule,
    CacheModule.register({
      ttl: 0,
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
