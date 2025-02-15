import { Injectable } from '@nestjs/common';
import { Data, renderFile } from 'ejs';
import {
  LOGO_PATHS,
  FILE_PATHS,
  PREDEFINED_DIMENSIONS,
} from 'src/constants/common.contants';
import { PDFGeneratorService } from 'src/providers/generatePdf.service';
import { CreateMemoDto } from './dto/createMemo.dto';

@Injectable()
export class MemoService {
  constructor(private readonly pdfGeneratorService: PDFGeneratorService) {}

  async createMemo(
    body: CreateMemoDto,
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

    const content = await renderFile(FILE_PATHS.MEMO_PDF, payloadToRender);

    return await this.pdfGeneratorService.generatePdf(
      PREDEFINED_DIMENSIONS.MEMO_HEIGHT,
      PREDEFINED_DIMENSIONS.MEMO_WIDTH,
      content,
    );
  }
}
