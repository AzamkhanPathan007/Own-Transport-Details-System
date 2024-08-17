import { CreateMemoDto } from '@commonDto/create_memo';
import { CreateSlipDto } from '@commonDto/create_slip';
import { renderFile } from 'ejs';
import { generatePdf } from 'html-pdf-node';
import { promisify } from 'node:util';

export class PDFCreator {
  constructor(
    private ObjectToInject: CreateMemoDto | CreateSlipDto,
    private filePathToRead: string,
  ) {
    this.ObjectToInject = ObjectToInject;
    this.filePathToRead = filePathToRead;
  }

  async generatePDF(Custom_height: string, Custom_width: string) {
    const content = await renderFile(this.filePathToRead, this.ObjectToInject),
      generatePDFAsync = promisify(generatePdf),
      pdfBytes = await generatePDFAsync(
        { content },
        { height: Custom_height, width: Custom_width },
      );

    return pdfBytes;
  }
}
