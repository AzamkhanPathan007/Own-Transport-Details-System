import { Controller, Get, Render, Post, Req, Res, Body } from '@nestjs/common';
import {
  CUSTOM_LOGO_BASE64,
  MEMO_PDF,
  OTS_CUSTOM_HEADING,
  OTS_LOGO_BASE64,
  RENDERED_OBJ,
  SIGNATURE_BASE64,
  SLIP_PDF,
} from '@constants/constant_variables';
import { CreateSlipDto } from '@commonDto/create_slip';
import { CreateMemoDto } from '@commonDto/create_memo';
import { Request, Response } from 'express';
import { PDFCreator } from '@services/create_pdf';
import { Readable } from 'stream';

@Controller('ots')
export class OtsController {
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
    const { Calculated_collection, Balance, Grand_total, Truck_number } = body,
      manipulatedBody = {
        ...body,
        Calculated_collection,
        Balance,
        Grand_total,
        Company_logo: OTS_LOGO_BASE64,
        Custom_logo: CUSTOM_LOGO_BASE64,
        Custom_heading: OTS_CUSTOM_HEADING,
        Custom_signature: SIGNATURE_BASE64,
      },
      pdfCreator = new PDFCreator(manipulatedBody, MEMO_PDF),
      stream = new Readable(),
      pdf = await pdfCreator.generatePDF();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'OTS_memo' : Truck_number}.pdf`,
    );
    res.setHeader('Content-Length', pdf.length);

    stream.push(pdf);
    stream.push(null);
    stream.pipe(res);
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
    const { Truck_number } = body,
      manipulatedBody = {
        ...body,
        Company_logo: OTS_LOGO_BASE64,
        Custom_logo: CUSTOM_LOGO_BASE64,
        Custom_heading: OTS_CUSTOM_HEADING,
        Custom_signature: SIGNATURE_BASE64,
      },
      pdfCreator = new PDFCreator(manipulatedBody, SLIP_PDF),
      stream = new Readable(),
      pdf = await pdfCreator.generatePDF('190mm', '210mm');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'OTS_slip' : Truck_number}.pdf`,
    );
    res.setHeader('Content-Length', pdf.length);

    stream.push(pdf);
    stream.push(null);
    stream.pipe(res);
  }
}
