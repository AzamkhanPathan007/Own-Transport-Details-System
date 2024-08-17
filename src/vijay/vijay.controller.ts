import { Controller, Get, Render, Post, Req, Res, Body } from '@nestjs/common';
import {
  MEMO_HEIGHT,
  MEMO_PDF,
  MEMO_WIDTH,
  RENDERED_OBJ,
  SLIP_HEIGHT,
  SLIP_PDF,
  SLIP_WIDTH,
  VARL_CUSTOM_HEADING,
} from '@constants/constantVariables';
import { Request, Response } from 'express';
import { CreateSlipDto } from 'commonDto/createSlip';
import { CreateMemoDto } from 'commonDto/createMemo';
import { PDFCreator } from '@services/createPdfEnhanced';
import { CachedLogoService } from '@utils/cachedLogo.service';

@Controller('vijay')
export class VijayController {
  constructor(private readonly cachedLogoService: CachedLogoService) {}

  @Get('/memo')
  @Render('Vijay_memo')
  getVijayMemo() {
    return RENDERED_OBJ;
  }

  @Post('/memo')
  async createVijayMemo(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateMemoDto,
  ) {
    const { Calculated_collection, Balance, Grand_total, Truck_number } = body;

    const [{ Company_logo }, { Custom_logo }, { Custom_signature }] =
      await Promise.all([
        this.cachedLogoService.getVARLCompanyLogo(),
        this.cachedLogoService.getCustomLogo(),
        this.cachedLogoService.getSignature(),
      ]);

    const manipulatedBody = {
        ...body,
        Calculated_collection,
        Balance,
        Grand_total,
        Company_logo,
        Custom_logo,
        Custom_heading: VARL_CUSTOM_HEADING,
        Custom_signature,
      },
      pdfCreator = new PDFCreator(manipulatedBody, MEMO_PDF),
      pdf = await pdfCreator.generatePDF(MEMO_HEIGHT, MEMO_WIDTH);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'VARL_memo' : Truck_number}.pdf`,
    );
    res.setHeader('Content-Length', pdf.length);

    return res.status(200).send(pdf);
  }

  @Get('/slip')
  @Render('Vijay_slip')
  getVijaySlip() {
    return RENDERED_OBJ;
  }

  @Post('/slip')
  async createVijaySlip(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateSlipDto,
  ) {
    const { Truck_number } = body;

    const [{ Company_logo }, { Custom_logo }, { Custom_signature }] =
      await Promise.all([
        this.cachedLogoService.getVARLCompanyLogo(),
        this.cachedLogoService.getCustomLogo(),
        this.cachedLogoService.getSignature(),
      ]);

    const manipulatedBody = {
        ...body,
        Company_logo,
        Custom_logo,
        Custom_heading: VARL_CUSTOM_HEADING,
        Custom_signature,
      },
      pdfCreator = new PDFCreator(manipulatedBody, SLIP_PDF),
      pdf = await pdfCreator.generatePDF(SLIP_HEIGHT, SLIP_WIDTH);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'VARL_slip' : Truck_number}.pdf`,
    );
    res.setHeader('Content-Length', pdf.length);

    return res.status(200).send(pdf);
  }
}
