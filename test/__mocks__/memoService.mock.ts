export const mockMemoService = {
	createMemo: jest.fn().mockResolvedValue(Buffer.from('Dummy pdf content')),
};
