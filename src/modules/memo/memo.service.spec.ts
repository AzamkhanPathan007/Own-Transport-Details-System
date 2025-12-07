import { Test, TestingModule } from '@nestjs/testing';
import { mockFetchCachedLogoService } from '../../../test/__mocks__/fetchCachedLogoService.mock';
import { mockHelperMethodsService } from '../../../test/__mocks__/helperMethodsService.mock';
import { mockPdfGeneratorService } from '../../../test/__mocks__/pdfGeneratorService.mock';
import {
	companyLogoStub,
	customHeadingStub,
} from '../../../test/__stubs__/common.stub';
import { memoStub } from '../../../test/__stubs__/memo.stub';
import { FetchCachedLogoService } from '../../providers/fetchCachedLogo.service';
import { PDFGeneratorService } from '../../providers/generatePdf.service';
import { HelperMethodService } from '../../providers/helperMethods.service';
import { MemoService } from './memo.service';

describe('MemoService', () => {
	let service: MemoService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MemoService,
				{
					provide: PDFGeneratorService,
					useValue: mockPdfGeneratorService,
				},
				{
					provide: FetchCachedLogoService,
					useValue: mockFetchCachedLogoService,
				},
				{
					provide: HelperMethodService,
					useValue: mockHelperMethodsService,
				},
			],
		}).compile();

		service = module.get<MemoService>(MemoService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('Should create a memo', async () => {
		const result = await service.createMemo(
			memoStub,
			customHeadingStub,
			companyLogoStub,
		);

		expect(result).toBeInstanceOf(Buffer);
		expect(result.toString()).toContain('Dummy pdf content');
	});
});
