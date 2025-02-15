import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { SlipService } from './slip.service';
import { RenderService } from 'src/providers/render.service';
import { CreateSlipDto } from './dto/createSlip.dto';
import { CUSTOM_HEADINGS, LOGO_PATHS } from 'src/constants/common.contants';
import { Response } from 'express';

@Controller('slip')
export class SlipController {
  constructor(
    private readonly slipService: SlipService,
    private readonly renderService: RenderService,
  ) {}

  @Get('/ots')
  @Render('OTSSlip')
  getOTSSlip() {
    return this.renderService.getRenderObject();
  }

  @Get('/vijay')
  @Render('vijaySlip')
  getVijaySlip() {
    return this.renderService.getRenderObject();
  }

  @Post('/ots')
  async createOTSSlip(@Res() res: Response, @Body() body: CreateSlipDto) {
    const { Truck_number } = body;

    const pdfBuffer = await this.slipService.createSlip(
      body,
      LOGO_PATHS.OTS_COMPANY_LOGO,
      CUSTOM_HEADINGS.OTS_CUSTOM_HEADING,
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'OTS_slip' : Truck_number}.pdf`,
    );
    res.setHeader('Content-Length', pdfBuffer.length);

    return res.status(200).send(pdfBuffer);
  }

  @Post('/vijay')
  async createVijaySlip(@Res() res: Response, @Body() body: CreateSlipDto) {
    const { Truck_number } = body;

    const pdfBuffer = await this.slipService.createSlip(
      body,
      LOGO_PATHS.VARL_COMPANY_LOGO,
      CUSTOM_HEADINGS.VARL_CUSTOM_HEADING,
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'vijay_slip' : Truck_number}.pdf`,
    );
    res.setHeader('Content-Length', pdfBuffer.length);

    return res.status(200).send(pdfBuffer);
  }
}
