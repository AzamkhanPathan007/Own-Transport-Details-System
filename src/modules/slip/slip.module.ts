import { Module } from '@nestjs/common';
import { SlipService } from './slip.service';
import { SlipController } from './slip.controller';
import { RenderService } from 'src/providers/render.service';
import { PDFGeneratorService } from 'src/providers/generatePdf.service';

@Module({
  controllers: [SlipController],
  providers: [SlipService, RenderService, PDFGeneratorService],
})
export class SlipModule {}
