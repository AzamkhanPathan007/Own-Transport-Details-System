import { Test, TestingModule } from '@nestjs/testing';
import { mockFetchCachedLogoService } from '../../../test/__mocks__/fetchCachedLogoService.mock';
import { mockPdfGeneratorService } from '../../../test/__mocks__/pdfGeneratorService.mock';
import {
	companyLogoStub,
	customHeadingStub,
} from '../../../test/__stubs__/common.stub';
import { slipStub } from '../../../test/__stubs__/slip.stub';
import { FetchCachedLogoService } from '../../providers/fetchCachedLogo.service';
import { PDFGeneratorService } from '../../providers/generatePdf.service';
import { SlipService } from './slip.service';

describe('SlipService', () => {
	let service: SlipService;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SlipService,
				{
					provide: PDFGeneratorService,
					useValue: mockPdfGeneratorService,
				},
				{
					provide: FetchCachedLogoService,
					useValue: mockFetchCachedLogoService,
				},
			],
		}).compile();

		service = module.get<SlipService>(SlipService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('Should create a slip', async () => {
		const result = await service.createSlip(
			slipStub,
			customHeadingStub,
			companyLogoStub,
		);

		expect(result).toBeInstanceOf(Buffer);
		expect(result.toString()).toContain('Dummy pdf content');
	});
});
