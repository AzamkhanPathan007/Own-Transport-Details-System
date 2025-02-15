import { Injectable } from '@nestjs/common';
import { Data, renderFile } from 'ejs';
import {
  LOGO_PATHS,
  FILE_PATHS,
  PREDEFINED_DIMENSIONS,
} from 'src/constants/common.contants';
import { PDFGeneratorService } from 'src/providers/generatePdf.service';
import { CreateSlipDto } from './dto/createSlip.dto';

@Injectable()
export class SlipService {
  constructor(private readonly pdfGeneratorService: PDFGeneratorService) {}

  async createSlip(
    body: CreateSlipDto,
    CompanyLogo: string,
    CustomHeading: string,
  ) {
    const payloadToRender: Data = {
      ...body,
      Company_logo: CompanyLogo,
      Custom_logo: LOGO_PATHS.CUSTOM_LOGO,
      Custom_heading: CustomHeading,
      Custom_signature: LOGO_PATHS.CUSTOM_SIGNATURE,
    };

    const content = await renderFile(FILE_PATHS.SLIP_PDF, payloadToRender);

    return await this.pdfGeneratorService.generatePdf(
      PREDEFINED_DIMENSIONS.SLIP_HEIGHT,
      PREDEFINED_DIMENSIONS.SLIP_WIDTH,
      content,
    );
  }
}
