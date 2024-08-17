import { Test, TestingModule } from '@nestjs/testing';
import { OtsController } from '@ots/ots.controller';
import { OtsService } from '@ots/ots.service';

describe('OtsController', () => {
  let controller: OtsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtsController],
      providers: [OtsService],
    }).compile();

    controller = module.get<OtsController>(OtsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
