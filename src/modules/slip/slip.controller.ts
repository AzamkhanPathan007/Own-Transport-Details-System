import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { SlipService } from './slip.service';
import { RenderService } from 'src/providers/render.service';
import { CreateSlipDto } from './dto/createSlip.dto';
import { CUSTOM_HEADINGS } from 'src/constants/common.constants';
import { Response } from 'express';
import { FetchCachedLogoService } from 'src/providers/fetchCachedLogo.service';

@Controller('slip')
export class SlipController {
  constructor(
    private readonly slipService: SlipService,
    private readonly renderService: RenderService,
    private readonly fetchCachedLogoService: FetchCachedLogoService,
  ) {}

  @Get('/ots')
  @Render('otsSlip')
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

    const { Company_logo } =
      await this.fetchCachedLogoService.getOTSCompanyLogo();

    const pdfStream = await this.slipService.createSlip(
      body,
      CUSTOM_HEADINGS.OTS_CUSTOM_HEADING,
      Company_logo,
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'OTS_slip' : Truck_number}.pdf`,
    );

    return pdfStream.pipe(res);
  }

  @Post('/vijay')
  async createVijaySlip(@Res() res: Response, @Body() body: CreateSlipDto) {
    const { Truck_number } = body;

    const { Company_logo } =
      await this.fetchCachedLogoService.getVARLCompanyLogo();

    const pdfStream = await this.slipService.createSlip(
      body,
      CUSTOM_HEADINGS.VARL_CUSTOM_HEADING,
      Company_logo,
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'vijay_slip' : Truck_number}.pdf`,
    );

    return pdfStream.pipe(res);
  }
}
