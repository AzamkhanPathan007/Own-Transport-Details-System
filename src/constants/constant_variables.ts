import { PRODUCTION_URL } from '../env-config';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const RENDERED_OBJ = {
    OTS_MEMO_URL: PRODUCTION_URL + '/ots/memo',
    OTS_SLIP_URL: PRODUCTION_URL + '/ots/slip',
    VIJAY_ANDRA_MEMO_URL: PRODUCTION_URL + '/vijay/memo',
    VIJAY_ANDRA_SLIP_URL: PRODUCTION_URL + '/vijay/slip',
  },
  VARL_LOGO_BASE64 = join('public/VarlLogo.txt'),
  VARL_COMPANY_LOGO = readFileSync(VARL_LOGO_BASE64, {
    encoding: 'utf-8',
  }),
  OTS_LOGO_BASE64 = join('public/OTSLogo.txt'),
  OTS_COMPANY_LOGO = readFileSync(OTS_LOGO_BASE64, {
    encoding: 'utf-8',
  }),
  CUSTOM_LOGO_BASE64 = join('public/CustomLogo.txt'),
  CUSTOM_LOGO = readFileSync(CUSTOM_LOGO_BASE64, {
    encoding: 'utf-8',
  }),
  SIGNATURE_BASE64 = join('public/Signature.txt'),
  CUSTOM_SIGNATURE = readFileSync(SIGNATURE_BASE64, {
    encoding: 'utf-8',
  }),
  OTS_CUSTOM_HEADING = 'OWNER TRANSPORT SERVICES',
  VARL_CUSTOM_HEADING = 'VIJAY ANDHRA ROADLINES',
  MEMO_PDF = join('views/memo_pdf.ejs'),
  SLIP_PDF = join('views/slip_pdf.ejs'),
  MEMO_HEIGHT = '296mm',
  MEMO_WIDTH = '260mm',
  SLIP_HEIGHT = '193mm',
  SLIP_WIDTH = '210mm';
