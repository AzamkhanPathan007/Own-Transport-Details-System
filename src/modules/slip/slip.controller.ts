import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Render,
  Res,
} from '@nestjs/common';
import { SlipService } from './slip.service';
import { CreateSlipDto } from './dto/createSlip.dto';
import { Response } from 'express';
import { CUSTOM_HEADINGS } from '../../constants/common.constants';
import { FetchCachedLogoService } from '../../providers/fetchCachedLogo.service';
import { RenderService } from '../../providers/render.service';

@Controller('slip')
export class SlipController {
  constructor(
    private readonly slipService: SlipService,
    private readonly renderService: RenderService,
    private readonly fetchCachedLogoService: FetchCachedLogoService,
  ) {}

  @Get('/ots')
  @Render('otsSlip')
  @Header('Content-Type', 'text/html')
  getOTSSlip() {
    return this.renderService.getRenderObject();
  }

  @Get('/vijay')
  @Render('vijaySlip')
  @Header('Content-Type', 'text/html')
  getVijaySlip() {
    return this.renderService.getRenderObject();
  }

  @Post('/ots')
  async createOTSSlip(@Res() res: Response, @Body() body: CreateSlipDto) {
    const { Truck_number } = body;

    const { Company_logo } =
      await this.fetchCachedLogoService.getOTSCompanyLogo();

    const pdfBuffer = await this.slipService.createSlip(
      body,
      CUSTOM_HEADINGS.OTS_CUSTOM_HEADING,
      Company_logo,
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'otsSlip' : Truck_number}.pdf`,
    );

    return res.end(pdfBuffer);
  }

  @Post('/vijay')
  async createVijaySlip(@Res() res: Response, @Body() body: CreateSlipDto) {
    const { Truck_number } = body;

    const { Company_logo } =
      await this.fetchCachedLogoService.getVARLCompanyLogo();

    const pdfBuffer = await this.slipService.createSlip(
      body,
      CUSTOM_HEADINGS.VARL_CUSTOM_HEADING,
      Company_logo,
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'vijaySlip' : Truck_number}.pdf`,
    );

    return res.end(pdfBuffer);
  }
}
