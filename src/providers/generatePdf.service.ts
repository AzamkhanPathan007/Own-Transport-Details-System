import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Worker } from 'worker_threads';
import {
  PUPPETEER_ARGS,
  WORKER_FILE_PATH,
} from '../../src/constants/common.constants';

@Injectable()
export class PDFGeneratorService {
  constructor(private readonly configService: ConfigService) {}

  generatePdf(height: string, width: string, content: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(WORKER_FILE_PATH, {
        workerData: {
          height,
          width,
          content,
          executablePath: this.configService.get<string>('CHROMIUM_PATH'),
          args: PUPPETEER_ARGS,
        },
      });

      worker.on('message', (data: Buffer | { data: { error: string } }) => {
        if ('error' in data) {
          reject(new BadRequestException(data.error));
        } else {
          resolve(data as Buffer);
        }
      });

      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(
            new InternalServerErrorException(
              `Worker stopped with exit code ${code}`,
            ),
          );
        }
      });
    });
  }
}
