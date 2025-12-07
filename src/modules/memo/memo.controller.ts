import {
	Body,
	Controller,
	Get,
	Header,
	Post,
	Render,
	StreamableFile,
} from '@nestjs/common';
import { CUSTOM_HEADINGS } from '../../constants/common.constants';
import { FetchCachedLogoService } from '../../providers/fetchCachedLogo.service';
import { RenderService } from '../../providers/render.service';
import { CreateMemoDto } from './dto/createMemo.dto';
import { MemoService } from './memo.service';

@Controller('memo')
export class MemoController {
	constructor(
		private readonly memoService: MemoService,
		private readonly renderService: RenderService,
		private readonly fetchCachedLogoService: FetchCachedLogoService,
	) {}

	@Get('/ots')
	@Render('otsMemo')
	@Header('Content-Type', 'text/html')
	getOTSMemo() {
		return this.renderService.getRenderObject();
	}

	@Get('/vijay')
	@Render('vijayMemo')
	@Header('Content-Type', 'text/html')
	getVijayMemo() {
		return this.renderService.getRenderObject();
	}

	@Post('/vijay')
	async createVijayMemo(@Body() body: CreateMemoDto) {
		const { Truck_number } = body;

		const { Company_logo } =
			await this.fetchCachedLogoService.getVARLCompanyLogo();

		const pdfBuffer = await this.memoService.createMemo(
			body,
			CUSTOM_HEADINGS.VARL_CUSTOM_HEADING,
			Company_logo,
		);

		return new StreamableFile(pdfBuffer, {
			type: 'application/pdf',
			disposition: `attachment; filename=${!Truck_number ? 'vijayMemo' : Truck_number}.pdf`,
		});
	}

	@Post('/ots')
	async createOTSMemo(@Body() body: CreateMemoDto) {
		const { Truck_number } = body;

		const { Company_logo } =
			await this.fetchCachedLogoService.getOTSCompanyLogo();

		const pdfBuffer = await this.memoService.createMemo(
			body,
			CUSTOM_HEADINGS.OTS_CUSTOM_HEADING,
			Company_logo,
		);

		return new StreamableFile(pdfBuffer, {
			type: 'application/pdf',
			disposition: `attachment; filename=${!Truck_number ? 'otsMemo' : Truck_number}.pdf`,
		});
	}
}
