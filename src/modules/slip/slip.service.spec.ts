import { Test, TestingModule } from '@nestjs/testing';
import { SlipService } from './slip.service';
import { Readable } from 'node:stream';
import { slipStub } from '../../../test/__stubs__/slip.stub';
import { FetchCachedLogoService } from '../../providers/fetchCachedLogo.service';
import { PDFGeneratorService } from '../../providers/generatePdf.service';
import { mockFetchCachedLogoService } from '../../../test/__mocks__/fetchCachedLogoService.mock';
import { mockPdfGeneratorService } from '../../../test/__mocks__/pdfGeneratorService.mock';
import {
  customHeadingStub,
  companyLogoStub,
} from '../../../test/__stubs__/common.stub';

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

    expect(result).toBeInstanceOf(Readable);

    const receivedData: Buffer[] = [];
    result.on('data', (chunk) => receivedData.push(chunk));

    await new Promise((resolve) => result.on('end', resolve));

    const output = Buffer.concat(receivedData).toString();
    expect(output).toContain('Dummy pdf content');
  });
});
