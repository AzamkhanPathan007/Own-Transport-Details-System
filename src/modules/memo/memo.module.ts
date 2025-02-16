import { Module } from '@nestjs/common';
import { MemoService } from './memo.service';
import { MemoController } from './memo.controller';
import { RenderService } from 'src/providers/render.service';
import { PDFGeneratorService } from 'src/providers/generatePdf.service';
import { FetchCachedLogoService } from 'src/providers/fetchCachedLogo.service';

@Module({
  controllers: [MemoController],
  providers: [
    MemoService,
    RenderService,
    PDFGeneratorService,
    FetchCachedLogoService,
  ],
})
export class MemoModule {}
