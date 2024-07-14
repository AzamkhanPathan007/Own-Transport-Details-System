import { PRODUCTION_URL } from '@envConfig';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const RENDERED_OBJ = {
  OTS_MEMO_URL: PRODUCTION_URL + '/ots/memo',
  OTS_SLIP_URL: PRODUCTION_URL + '/ots/slip',
  VIJAY_ANDRA_MEMO_URL: PRODUCTION_URL + '/vijay/memo',
  VIJAY_ANDRA_SLIP_URL: PRODUCTION_URL + '/vijay/slip',
};

export const VARL_LOGO_BASE64 = join(
  __dirname,
  '../',
  '../',
  'public/VarlLogo.txt',
);

export const COMPANY_LOGO = readFileSync(VARL_LOGO_BASE64, {
  encoding: 'utf-8',
});

export const OTS_LOGO_BASE64 = join(
  __dirname,
  '../',
  '../',
  'public/OTSLogo.txt',
);

export const CUSTOM_LOGO_BASE64 = join(
  __dirname,
  '../',
  '../',
  'public/CustomLogo.txt',
);

export const CUSTOM_LOGO = readFileSync(CUSTOM_LOGO_BASE64, {
  encoding: 'utf-8',
});

export const SIGNATURE_BASE64 = join(
  __dirname,
  '../',
  '../',
  'public/Signature.txt',
);

export const CUSTOM_SIGNATURE = readFileSync(SIGNATURE_BASE64, {
  encoding: 'utf-8',
});

export const OTS_CUSTOM_HEADING = 'OWNER TRANSPORT SERVICES';

export const VARL_CUSTOM_HEADING = 'VIJAY ANDHRA ROADLINES';

export const MEMO_PDF = join(__dirname, '../', '../', 'views/memo_pdf.ejs');

export const SLIP_PDF = join(__dirname, '../', '../', 'views/slip_pdf.ejs');
