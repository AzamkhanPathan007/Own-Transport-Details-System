import { Module } from '@nestjs/common';
import { SlipService } from './slip.service';
import { SlipController } from './slip.controller';
import { FetchCachedLogoService } from '../../providers/fetchCachedLogo.service';
import { PDFGeneratorService } from '../../providers/generatePdf.service';
import { RenderService } from '../../providers/render.service';

@Module({
  controllers: [SlipController],
  providers: [
    SlipService,
    RenderService,
    PDFGeneratorService,
    FetchCachedLogoService,
  ],
})
export class SlipModule {}
