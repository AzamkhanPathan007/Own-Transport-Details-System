import { helperMethodsServiceStub } from '../__stubs__/helperMethodsService.stub';

export const mockHelperMethodsService = {
	calculateFields: jest.fn().mockReturnValue(helperMethodsServiceStub),
};
