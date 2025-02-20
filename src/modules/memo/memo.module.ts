import { Module } from '@nestjs/common';
import { MemoService } from './memo.service';
import { MemoController } from './memo.controller';
import { PDFGeneratorService } from '../../providers/generatePdf.service';
import { FetchCachedLogoService } from '../../providers/fetchCachedLogo.service';
import { HelperMethodService } from '../../providers/helperMethods.service';
import { RenderService } from '../../providers/render.service';

@Module({
  controllers: [MemoController],
  providers: [
    MemoService,
    RenderService,
    PDFGeneratorService,
    FetchCachedLogoService,
    HelperMethodService,
  ],
})
export class MemoModule {}
