import { Controller } from '@nestjs/common';
import { SlipService } from './slip.service';

@Controller('slip')
export class SlipController {
  constructor(private readonly slipService: SlipService) {}
}
