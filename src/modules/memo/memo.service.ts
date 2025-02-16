import { Injectable } from '@nestjs/common';
import { Data, renderFile } from 'ejs';
import {
  FILE_PATHS,
  PREDEFINED_DIMENSIONS,
} from 'src/constants/common.contants';
import { PDFGeneratorService } from 'src/providers/generatePdf.service';
import { CreateMemoDto } from './dto/createMemo.dto';
import { FetchCachedLogoService } from 'src/providers/fetchCachedLogo.service';

@Injectable()
export class MemoService {
  constructor(
    private readonly pdfGeneratorService: PDFGeneratorService,
    private readonly fetchCachedLogoService: FetchCachedLogoService,
  ) {}

  async createMemo(
    body: CreateMemoDto,
    CustomHeading: string,
    CompanyLogo: string | null,
  ) {
    const [{ Custom_logo }, { Custom_signature }] = await Promise.all([
      this.fetchCachedLogoService.getCustomLogo(),
      this.fetchCachedLogoService.getSignature(),
    ]);

    const payloadToRender: Data = {
      ...body,
      Company_logo: CompanyLogo,
      Custom_logo,
      Custom_heading: CustomHeading,
      Custom_signature,
    };

    const content = await renderFile(FILE_PATHS.MEMO_PDF, payloadToRender);

    return await this.pdfGeneratorService.generatePdf(
      PREDEFINED_DIMENSIONS.MEMO_HEIGHT,
      PREDEFINED_DIMENSIONS.MEMO_WIDTH,
      content,
    );
  }
}
