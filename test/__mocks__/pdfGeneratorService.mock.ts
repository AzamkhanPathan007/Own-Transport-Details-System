export const mockPdfGeneratorService = {
	generatePdf: jest.fn().mockResolvedValue(Buffer.from('Dummy pdf content')),
};
