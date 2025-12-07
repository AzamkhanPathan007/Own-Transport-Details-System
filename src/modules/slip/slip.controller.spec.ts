import { Test, TestingModule } from '@nestjs/testing';
import { mockFetchCachedLogoService } from '../../../test/__mocks__/fetchCachedLogoService.mock';
import { mockRenderService } from '../../../test/__mocks__/renderService.mock';
import { mockSlipService } from '../../../test/__mocks__/slipService.mock';
import { renderServiceStub } from '../../../test/__stubs__/renderService.stub';
import { FetchCachedLogoService } from '../../providers/fetchCachedLogo.service';
import { RenderService } from '../../providers/render.service';
import { SlipController } from './slip.controller';
import { SlipService } from './slip.service';

describe('SlipController', () => {
	let controller: SlipController;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SlipController],
			providers: [
				{
					provide: SlipService,
					useValue: mockSlipService,
				},
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

		controller = module.get<SlipController>(SlipController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return ots slip render object', () => {
		expect(controller.getOTSSlip()).toBe(renderServiceStub);
		expect(mockRenderService.getRenderObject).toHaveBeenCalled();
	});

	it('should return vijay slip render object', () => {
		expect(controller.getVijaySlip()).toBe(renderServiceStub);
		expect(mockRenderService.getRenderObject).toHaveBeenCalled();
	});
});
