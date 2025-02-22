import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_KEYS } from '../../src/constants/common.constants';

@Injectable()
export class FetchCachedLogoService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  private getCachedLogo(key: string) {
    return this.cacheManager.get<string>(key);
  }

  async getOTSCompanyLogo() {
    return {
      Company_logo: await this.getCachedLogo(CACHE_KEYS.OTS_COMPANY_LOGO),
    };
  }

  async getVARLCompanyLogo() {
    return {
      Company_logo: await this.getCachedLogo(CACHE_KEYS.VARL_COMPANY_LOGO),
    };
  }

  async getCustomLogo() {
    return { Custom_logo: await this.getCachedLogo(CACHE_KEYS.CUSTOM_LOGO) };
  }

  async getSignature() {
    return {
      Custom_signature: await this.getCachedLogo(CACHE_KEYS.CUSTOM_SIGNATURE),
    };
  }
}
