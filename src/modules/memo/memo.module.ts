import { Module } from '@nestjs/common';
import { FetchCachedLogoService } from '../../providers/fetchCachedLogo.service';
import { PDFGeneratorService } from '../../providers/generatePdf.service';
import { HelperMethodService } from '../../providers/helperMethods.service';
import { RenderService } from '../../providers/render.service';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';

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
