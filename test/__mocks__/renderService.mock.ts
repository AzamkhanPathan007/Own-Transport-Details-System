import { renderServiceStub } from '../__stubs__/renderService.stub';

export const mockRenderService = {
  getRenderObject: jest.fn().mockReturnValue(renderServiceStub),
};
