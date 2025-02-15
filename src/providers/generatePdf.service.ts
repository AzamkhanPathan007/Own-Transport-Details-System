import { Injectable } from '@nestjs/common';
import { executablePath, launch } from 'puppeteer';

@Injectable()
export class PDFGeneratorService {
  async generatePdf(height: string, width: string, content: string) {
    const browser = await launch({ executablePath: executablePath() });

    const page = await browser.newPage();

    await page.setContent(content, { waitUntil: 'networkidle0' });

    return await page.pdf({ height, width });
  }
}
