import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'node:stream';
import { launch } from 'puppeteer-core';
import { PUPPETEER_ARGS } from '../../src/constants/common.constants';

@Injectable()
export class PDFGeneratorService {
  constructor(private readonly configService: ConfigService) {}

  async generatePdf(height: string, width: string, content: string) {
    const browser = await launch({
      executablePath: this.configService.getOrThrow<string>('CHROMIUM_PATH'),
      args: PUPPETEER_ARGS,
    });

    try {
      const page = await browser.newPage();
      await page.setContent(content, { waitUntil: 'networkidle0' });

      const pdfReadableStream = await page.createPDFStream({
        height,
        width,
        printBackground: true,
        scale: 1,
      });

      const pdfStream = Readable.from(pdfReadableStream);

      pdfStream.on('end', () => {
        browser.close().catch((err) => {
          throw err;
        });
      });

      pdfStream.on('error', (err) => {
        browser.close().catch(() => {
          throw err;
        });
      });

      return pdfStream;
    } catch (error) {
      await browser.close();
      throw error;
    }
  }
}
