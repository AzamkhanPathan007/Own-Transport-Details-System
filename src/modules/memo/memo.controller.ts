import { Controller, Get, Render } from '@nestjs/common';
import { MemoService } from './memo.service';
import { ConfigService } from '@nestjs/config';

@Controller('memo')
export class MemoController {
  constructor(
    private readonly memoService: MemoService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/ots')
  @Render('OTSMemo')
  getOTSMemo() {
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
  @Render('vijayMemo')
  getVijayMemo() {
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
