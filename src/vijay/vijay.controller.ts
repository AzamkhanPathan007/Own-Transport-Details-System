import { Controller, Get, Render, Post, Req, Res, Body } from '@nestjs/common';
import { VijayService } from '@vijay/vijay.service';
import {
  CUSTOM_LOGO_BASE64,
  MEMO_PDF,
  RENDERED_OBJ,
  SIGNATURE_BASE64,
  SLIP_PDF,
  VARL_CUSTOM_HEADING,
  VARL_LOGO_BASE64,
} from '@constants/constant_variables';
import { Request, Response } from 'express';
import { CreateSlipDto } from '@commonDto/create_slip';
import { CreateMemoDto } from '@commonDto/create_memo';
import { PDFCreator } from '@services/create_pdf';
import { Readable } from 'node:stream';
import { readFile } from 'node:fs/promises';

@Controller('vijay')
export class VijayController {
  constructor(private readonly vijayService: VijayService) {}

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

    const Company_logo = await readFile(VARL_LOGO_BASE64, {
      encoding: 'utf-8',
    });

    const Custom_logo = await readFile(CUSTOM_LOGO_BASE64, {
      encoding: 'utf-8',
    });

    const Custom_signature = await readFile(SIGNATURE_BASE64, {
      encoding: 'utf-8',
    });

    const manipulatedBody = {
      ...body,
      Calculated_collection,
      Balance,
      Grand_total,
      Company_logo,
      Custom_logo,
      Custom_heading: VARL_CUSTOM_HEADING,
      Custom_signature,
    };

    const pdfCreator = new PDFCreator(manipulatedBody, MEMO_PDF);

    const stream = new Readable();

    const pdf = await pdfCreator.generatePDF();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${!Truck_number ? 'VARL_memo' : Truck_number}.pdf`,
    );
    res.setHeader('Content-Length', pdf.length);

    stream.push(pdf);
    stream.push(null);

    stream.pipe(res);
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

    const Company_logo = await readFile(VARL_LOGO_BASE64, {
      encoding: 'utf-8',
    });

    const Custom_logo = await readFile(CUSTOM_LOGO_BASE64, {
      encoding: 'utf-8',
    });

    const Custom_signature = await readFile(SIGNATURE_BASE64, {
      encoding: 'utf-8',
    });

    const manipulatedBody = {
      ...body,
      Company_logo,
      Custom_logo,
      Custom_heading: VARL_CUSTOM_HEADING,
      Custom_signature,
    };

    const pdfCreator = new PDFCreator(manipulatedBody, SLIP_PDF);

    const stream = new Readable();

    const pdf = await pdfCreator.generatePDF('190mm', '210mm');

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
