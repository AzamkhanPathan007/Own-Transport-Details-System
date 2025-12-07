import { Worker } from 'node:worker_threads';
import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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

			worker.on('message', (data: Buffer | { error: string }) => {
				if (Buffer.isBuffer(data) || data instanceof Uint8Array) {
					const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);
					return resolve(buf);
				} else {
					reject(new BadRequestException(data.error));
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
