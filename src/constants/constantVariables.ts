import { WEB_URL } from '../envConfig';
import { join } from 'node:path';

export const RENDERED_OBJ = {
    OTS_MEMO_URL: WEB_URL + '/ots/memo',
    OTS_SLIP_URL: WEB_URL + '/ots/slip',
    VIJAY_ANDRA_MEMO_URL: WEB_URL + '/vijay/memo',
    VIJAY_ANDRA_SLIP_URL: WEB_URL + '/vijay/slip',
  },
  OTS_CUSTOM_HEADING = 'OWNER TRANSPORT SERVICES',
  VARL_CUSTOM_HEADING = 'VIJAY ANDHRA ROADLINES',
  MEMO_PDF = join('views/memo_pdf.ejs'),
  SLIP_PDF = join('views/slip_pdf.ejs'),
  MEMO_HEIGHT = '296mm',
  MEMO_WIDTH = '260mm',
  SLIP_HEIGHT = '193mm',
  SLIP_WIDTH = '210mm';

export enum CachingKeys {
  VARL_COMPANY_LOGO = 'VARL_COMPANY_LOGO',
  OTS_COMPANY_LOGO = 'OTS_COMPANY_LOGO',
  CUSTOM_LOGO = 'CUSTOM_LOGO',
  CUSTOM_SIGNATURE = 'CUSTOM_SIGNATURE',
}
