import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { MemoService } from './memo.service';
import { RenderService } from 'src/providers/render.service';
import { LOGO_PATHS, CUSTOM_HEADINGS } from 'src/constants/common.contants';
import { CreateMemoDto } from './dto/createMemo.dto';
import { Response } from 'express';

@Controller('memo')
export class MemoController {
  constructor(
    private readonly memoService: MemoService,
    private readonly renderService: RenderService,
  ) {}

  @Get('/ots')
  @Render('OTSMemo')
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

    const pdfBuffer = await this.memoService.createMemo(
      body,
      LOGO_PATHS.VARL_COMPANY_LOGO,
      CUSTOM_HEADINGS.VARL_CUSTOM_HEADING,
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'vijay_memo' : Truck_number}.pdf`,
    );
    res.setHeader('Content-Length', pdfBuffer.length);

    return res.status(200).send(pdfBuffer);
  }

  @Post('/memo')
  async createOTSMemo(@Res() res: Response, @Body() body: CreateMemoDto) {
    const { Truck_number } = body;

    const pdfBuffer = await this.memoService.createMemo(
      body,
      LOGO_PATHS.OTS_COMPANY_LOGO,
      CUSTOM_HEADINGS.OTS_CUSTOM_HEADING,
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'OTS_memo' : Truck_number}.pdf`,
    );
    res.setHeader('Content-Length', pdfBuffer.length);

    return res.status(200).send(pdfBuffer);
  }
}
