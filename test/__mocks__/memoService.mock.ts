import { createMockReadable } from './common.mock';

export const mockMemoService = {
  createMemo: jest.fn().mockResolvedValue(createMockReadable('Dummy pdf memo')),
};
