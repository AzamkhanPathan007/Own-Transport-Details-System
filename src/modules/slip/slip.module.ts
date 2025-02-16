import { Module } from '@nestjs/common';
import { SlipService } from './slip.service';
import { SlipController } from './slip.controller';
import { RenderService } from 'src/providers/render.service';
import { PDFGeneratorService } from 'src/providers/generatePdf.service';
import { FetchCachedLogoService } from 'src/providers/fetchCachedLogo.service';

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
