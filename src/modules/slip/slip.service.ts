import { Injectable } from '@nestjs/common';
import { Data, renderFile } from 'ejs';
import { CreateSlipDto } from './dto/createSlip.dto';
import {
  FILE_PATHS,
  PREDEFINED_DIMENSIONS,
} from '../../constants/common.constants';
import { FetchCachedLogoService } from '../../providers/fetchCachedLogo.service';
import { PDFGeneratorService } from '../../providers/generatePdf.service';

@Injectable()
export class SlipService {
  constructor(
    private readonly pdfGeneratorService: PDFGeneratorService,
    private readonly fetchCachedLogoService: FetchCachedLogoService,
  ) {}

  async createSlip(
    body: CreateSlipDto,
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

    const content = await renderFile(FILE_PATHS.SLIP_PDF, payloadToRender);

    return await this.pdfGeneratorService.generatePdf(
      PREDEFINED_DIMENSIONS.SLIP_HEIGHT,
      PREDEFINED_DIMENSIONS.SLIP_WIDTH,
      content,
    );
  }
}
