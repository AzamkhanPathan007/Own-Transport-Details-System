import { Test, TestingModule } from '@nestjs/testing';
import { SlipService } from './slip.service';

describe('SlipService', () => {
  let service: SlipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlipService],
    }).compile();

    service = module.get<SlipService>(SlipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
