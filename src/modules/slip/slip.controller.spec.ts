import { Test, TestingModule } from '@nestjs/testing';
import { SlipController } from './slip.controller';
import { SlipService } from './slip.service';

describe('SlipController', () => {
  let controller: SlipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlipController],
      providers: [SlipService],
    }).compile();

    controller = module.get<SlipController>(SlipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
