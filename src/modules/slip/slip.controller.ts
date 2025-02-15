import { Controller, Get, Render } from '@nestjs/common';
import { SlipService } from './slip.service';
import { ConfigService } from '@nestjs/config';

@Controller('slip')
export class SlipController {
  constructor(
    private readonly slipService: SlipService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/ots')
  @Render('OTSSlip')
  getOTSSlip() {
    const WEB_URL = this.configService.getOrThrow<string>('WEB_URL');

    const RENDERED_OBJ = {
      OTS_MEMO_URL: WEB_URL + '/memo/ots',
      OTS_SLIP_URL: WEB_URL + '/slip/ots',
      VIJAY_ANDRA_MEMO_URL: WEB_URL + '/memo/vijay',
      VIJAY_ANDRA_SLIP_URL: WEB_URL + '/slip/vijay',
    };

    return RENDERED_OBJ;
  }

  @Get('/vijay')
  @Render('vijaySlip')
  getVijaySlip() {
    const WEB_URL = this.configService.getOrThrow<string>('WEB_URL');

    const RENDERED_OBJ = {
      OTS_MEMO_URL: WEB_URL + '/memo/ots',
      OTS_SLIP_URL: WEB_URL + '/slip/ots',
      VIJAY_ANDRA_MEMO_URL: WEB_URL + '/memo/vijay',
      VIJAY_ANDRA_SLIP_URL: WEB_URL + '/slip/vijay',
    };

    return RENDERED_OBJ;
  }
}
