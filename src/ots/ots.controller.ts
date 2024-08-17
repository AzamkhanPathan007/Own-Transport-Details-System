import { Controller, Get, Render, Post, Req, Res, Body } from '@nestjs/common';
import {
  MEMO_PDF,
  OTS_CUSTOM_HEADING,
  RENDERED_OBJ,
  SLIP_PDF,
  MEMO_WIDTH,
  MEMO_HEIGHT,
  SLIP_HEIGHT,
  SLIP_WIDTH,
} from '@constants/constantVariables';
import { CreateSlipDto } from 'commonDto/createSlip';
import { CreateMemoDto } from 'commonDto/createMemo';
import { Request, Response } from 'express';
import { PDFCreator } from '@services/createPdfEnhanced';
import { CachedLogoService } from '@utils/cachedLogo.service';

@Controller('ots')
export class OtsController {
  constructor(private readonly cachedLogoService: CachedLogoService) {}

  @Get('/memo')
  @Render('Own_memo')
  getOTSMemo() {
    return RENDERED_OBJ;
  }

  @Post('/memo')
  async createOTSMemo(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateMemoDto,
  ) {
    const { Calculated_collection, Balance, Grand_total, Truck_number } = body;

    const [{ Company_logo }, { Custom_logo }, { Custom_signature }] =
      await Promise.all([
        this.cachedLogoService.getOTSCompanyLogo(),
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
        Custom_heading: OTS_CUSTOM_HEADING,
        Custom_signature,
      },
      pdfCreator = new PDFCreator(manipulatedBody, MEMO_PDF),
      pdf = await pdfCreator.generatePDF(MEMO_HEIGHT, MEMO_WIDTH);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'OTS_memo' : Truck_number}.pdf`,
    );
    res.setHeader('Content-Length', pdf.length);

    return res.status(200).send(pdf);
  }

  @Get('/slip')
  @Render('Own_slip')
  getOTSSlip() {
    return RENDERED_OBJ;
  }

  @Post('/slip')
  async createOTSSlip(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateSlipDto,
  ) {
    const { Truck_number } = body;

    const [{ Company_logo }, { Custom_logo }, { Custom_signature }] =
      await Promise.all([
        this.cachedLogoService.getOTSCompanyLogo(),
        this.cachedLogoService.getCustomLogo(),
        this.cachedLogoService.getSignature(),
      ]);

    const manipulatedBody = {
        ...body,
        Company_logo,
        Custom_logo,
        Custom_heading: OTS_CUSTOM_HEADING,
        Custom_signature,
      },
      pdfCreator = new PDFCreator(manipulatedBody, SLIP_PDF),
      pdf = await pdfCreator.generatePDF(SLIP_HEIGHT, SLIP_WIDTH);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'OTS_slip' : Truck_number}.pdf`,
    );
    res.setHeader('Content-Length', pdf.length);

    return res.status(200).send(pdf);
  }
}
