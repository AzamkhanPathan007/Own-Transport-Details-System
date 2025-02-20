import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { MemoService } from './memo.service';
import { CreateMemoDto } from './dto/createMemo.dto';
import { Response } from 'express';
import { CUSTOM_HEADINGS } from '../../constants/common.constants';
import { FetchCachedLogoService } from '../../providers/fetchCachedLogo.service';
import { RenderService } from '../../providers/render.service';

@Controller('memo')
export class MemoController {
  constructor(
    private readonly memoService: MemoService,
    private readonly renderService: RenderService,
    private readonly fetchCachedLogoService: FetchCachedLogoService,
  ) {}

  @Get('/ots')
  @Render('otsMemo')
  getOTSMemo() {
    return this.renderService.getRenderObject();
  }

  @Get('/vijay')
  @Render('vijayMemo')
  getVijayMemo() {
    return this.renderService.getRenderObject();
  }

  @Post('/vijay')
  async createVijayMemo(@Res() res: Response, @Body() body: CreateMemoDto) {
    const { Truck_number } = body;

    const { Company_logo } =
      await this.fetchCachedLogoService.getVARLCompanyLogo();

    const pdfStream = await this.memoService.createMemo(
      body,
      CUSTOM_HEADINGS.VARL_CUSTOM_HEADING,
      Company_logo,
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'vijayMemo' : Truck_number}.pdf`,
    );

    return pdfStream.pipe(res);
  }

  @Post('/ots')
  async createOTSMemo(@Res() res: Response, @Body() body: CreateMemoDto) {
    const { Truck_number } = body;

    const { Company_logo } =
      await this.fetchCachedLogoService.getOTSCompanyLogo();

    const pdfStream = await this.memoService.createMemo(
      body,
      CUSTOM_HEADINGS.OTS_CUSTOM_HEADING,
      Company_logo,
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'otsMemo' : Truck_number}.pdf`,
    );

    return pdfStream.pipe(res);
  }
}
