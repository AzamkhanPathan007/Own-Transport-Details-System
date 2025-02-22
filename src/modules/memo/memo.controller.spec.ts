import { Test, TestingModule } from '@nestjs/testing';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';
import { FetchCachedLogoService } from '../../providers/fetchCachedLogo.service';
import { mockFetchCachedLogoService } from '../../../test/__mocks__/fetchCachedLogoService.mock';
import { mockRenderService } from '../../../test/__mocks__/renderService.mock';
import { RenderService } from '../../providers/render.service';
import { mockMemoService } from '../../../test/__mocks__/memoService.mock';
import { renderServiceStub } from '../../../test/__stubs__/renderService.stub';

describe('MemoController', () => {
  let controller: MemoController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemoController],
      providers: [
        { provide: MemoService, useValue: mockMemoService },
        {
          provide: FetchCachedLogoService,
          useValue: mockFetchCachedLogoService,
        },
        {
          provide: RenderService,
          useValue: mockRenderService,
        },
      ],
    }).compile();

    controller = module.get<MemoController>(MemoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return ots memo render object', () => {
    expect(controller.getOTSMemo()).toBe(renderServiceStub);
    expect(mockRenderService.getRenderObject).toHaveBeenCalled();
  });

  it('should return vijay memo render object', () => {
    expect(controller.getVijayMemo()).toBe(renderServiceStub);
    expect(mockRenderService.getRenderObject).toHaveBeenCalled();
  });
});
