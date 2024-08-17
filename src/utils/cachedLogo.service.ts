import { CachingKeys } from '@constants/constantVariables';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

@Injectable()
export class CachedLogoService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getOTSCompanyLogo() {
    const CACHED_COMPANY_LOGO = await this.cacheManager.get(
      CachingKeys.OTS_COMPANY_LOGO,
    );

    if (!CACHED_COMPANY_LOGO) {
      const COMPANY_LOGO = await readFile(join('public/OTSLogo.txt'), {
        encoding: 'utf-8',
      });

      await this.cacheManager.set(CachingKeys.OTS_COMPANY_LOGO, COMPANY_LOGO);

      return { Company_logo: COMPANY_LOGO };
    }

    return { Company_logo: CACHED_COMPANY_LOGO };
  }

  async getVARLCompanyLogo() {
    const CACHED_COMPANY_LOGO = await this.cacheManager.get(
      CachingKeys.VARL_COMPANY_LOGO,
    );

    if (!CACHED_COMPANY_LOGO) {
      const COMPANY_LOGO = await readFile(join('public/VarlLogo.txt'), {
        encoding: 'utf-8',
      });

      await this.cacheManager.set(CachingKeys.VARL_COMPANY_LOGO, COMPANY_LOGO);

      return { Company_logo: COMPANY_LOGO };
    }

    return { Company_logo: CACHED_COMPANY_LOGO };
  }

  async getSignature() {
    const CACHED_COMPANY_SIGNATURE = await this.cacheManager.get(
      CachingKeys.CUSTOM_SIGNATURE,
    );

    if (!CACHED_COMPANY_SIGNATURE) {
      const COMPANY_SIGNATURE = await readFile(join('public/Signature.txt'), {
        encoding: 'utf-8',
      });

      await this.cacheManager.set(
        CachingKeys.CUSTOM_SIGNATURE,
        COMPANY_SIGNATURE,
      );

      return { Custom_signature: COMPANY_SIGNATURE };
    }

    return { Custom_signature: CACHED_COMPANY_SIGNATURE };
  }

  async getCustomLogo() {
    const CACHED_CUSTOM_LOGO = await this.cacheManager.get(
      CachingKeys.CUSTOM_LOGO,
    );

    if (!CACHED_CUSTOM_LOGO) {
      const CUSTOM_LOGO = await readFile(join('public/CustomLogo.txt'), {
        encoding: 'utf-8',
      });

      await this.cacheManager.set(CachingKeys.CUSTOM_LOGO, CUSTOM_LOGO);

      return { Custom_logo: CUSTOM_LOGO };
    }

    return { Custom_logo: CACHED_CUSTOM_LOGO };
  }
}
