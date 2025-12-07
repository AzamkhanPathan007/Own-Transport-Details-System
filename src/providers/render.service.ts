import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RenderService {
	private readonly WEB_URL: string;

	constructor(private readonly configService: ConfigService) {
		this.WEB_URL = this.configService.getOrThrow<string>('WEB_URL');
	}

	getRenderObject() {
		return {
			OTS_MEMO_URL: `${this.WEB_URL}/memo/ots`,
			OTS_SLIP_URL: `${this.WEB_URL}/slip/ots`,
			VIJAY_ANDRA_MEMO_URL: `${this.WEB_URL}/memo/vijay`,
			VIJAY_ANDRA_SLIP_URL: `${this.WEB_URL}/slip/vijay`,
		};
	}
}
