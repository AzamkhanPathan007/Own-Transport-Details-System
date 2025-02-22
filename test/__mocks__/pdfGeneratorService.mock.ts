import { createMockReadable } from './common.mock';

export const mockPdfGeneratorService = {
  generatePdf: jest
    .fn()
    .mockResolvedValue(createMockReadable('Dummy pdf content')),
};
