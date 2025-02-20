import { createMockReadable } from './common.mock';

export const mockSlipService = {
  createSlip: jest.fn().mockResolvedValue(createMockReadable('Dummy pdf slip')),
};
