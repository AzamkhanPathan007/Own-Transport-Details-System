export const mockSlipService = {
	createSlip: jest.fn().mockResolvedValue(Buffer.from('Dummy pdf slip')),
};
