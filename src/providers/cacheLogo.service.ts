import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
	Inject,
	Injectable,
	Logger,
	OnApplicationBootstrap,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_KEYS, LOGO_PATHS } from '../../src/constants/common.constants';

@Injectable()
export class CacheLogoService implements OnApplicationBootstrap {
	private readonly loggerService = new Logger(CacheLogoService.name);

	constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

	async onApplicationBootstrap() {
		try {
			const readBase64File = (filePath: string): Promise<string> => {
				return readFile(join('public/', filePath), { encoding: 'utf-8' });
			};

			//* Read base64 contents from files
			const [otsLogo, varlLogo, customLogo, customSignature] =
				await Promise.all([
					readBase64File(LOGO_PATHS.OTS_COMPANY_LOGO),
					readBase64File(LOGO_PATHS.VARL_COMPANY_LOGO),
					readBase64File(LOGO_PATHS.CUSTOM_LOGO),
					readBase64File(LOGO_PATHS.CUSTOM_SIGNATURE),
				]);

			//* Cache the Base64 strings
			await Promise.all([
				this.cacheManager.set(CACHE_KEYS.OTS_COMPANY_LOGO, otsLogo),
				this.cacheManager.set(CACHE_KEYS.VARL_COMPANY_LOGO, varlLogo),
				this.cacheManager.set(CACHE_KEYS.CUSTOM_LOGO, customLogo),
				this.cacheManager.set(CACHE_KEYS.CUSTOM_SIGNATURE, customSignature),
			]);

			this.loggerService.log('✅ Base64 logos cached successfully');
		} catch (error) {
			this.loggerService.error('❌ Error caching logos:', error);
		}
	}
}
