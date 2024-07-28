import { Controller, Get, Render, Post, Req, Res, Body } from '@nestjs/common';
import {
  CUSTOM_LOGO,
  CUSTOM_SIGNATURE,
  MEMO_HEIGHT,
  MEMO_PDF,
  MEMO_WIDTH,
  RENDERED_OBJ,
  SLIP_HEIGHT,
  SLIP_PDF,
  SLIP_WIDTH,
  VARL_COMPANY_LOGO,
  VARL_CUSTOM_HEADING,
} from '@constants/constant_variables';
import { Request, Response } from 'express';
import { CreateSlipDto } from '@commonDto/create_slip';
import { CreateMemoDto } from '@commonDto/create_memo';
import { PDFCreator } from '@services/create_pdf_enhanced';
import { Readable } from 'node:stream';

@Controller('vijay')
export class VijayController {
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
    const { Calculated_collection, Balance, Grand_total, Truck_number } = body,
      manipulatedBody = {
        ...body,
        Calculated_collection,
        Balance,
        Grand_total,
        Company_logo: VARL_COMPANY_LOGO,
        Custom_logo: CUSTOM_LOGO,
        Custom_heading: VARL_CUSTOM_HEADING,
        Custom_signature: CUSTOM_SIGNATURE,
      },
      pdfCreator = new PDFCreator(manipulatedBody, MEMO_PDF),
      pdf = await pdfCreator.generatePDF(MEMO_HEIGHT, MEMO_WIDTH);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'VARL_memo' : Truck_number}.pdf`,
    );
    res.setHeader('Content-Length', pdf.length);

    res.status(200).send(pdf);
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
    const { Truck_number } = body,
      manipulatedBody = {
        ...body,
        Company_logo: VARL_COMPANY_LOGO,
        Custom_logo: CUSTOM_LOGO,
        Custom_heading: VARL_CUSTOM_HEADING,
        Custom_signature: CUSTOM_SIGNATURE,
      },
      pdfCreator = new PDFCreator(manipulatedBody, SLIP_PDF),
      stream = new Readable(),
      pdf = await pdfCreator.generatePDF(SLIP_HEIGHT, SLIP_WIDTH);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'VARL_slip' : Truck_number}.pdf`,
    );
    res.setHeader('Content-Length', pdf.length);

    stream.push(pdf);
    stream.push(null);
    stream.pipe(res);
  }
}
