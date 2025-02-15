import { join } from 'node:path';

export const LOGO_PATHS = {
  OTS_COMPANY_LOGO: '/OTSLogo.txt',
  VARL_COMPANY_LOGO: '/VarlLogo.txt',
  CUSTOM_LOGO: '/CustomLogo.txt',
  CUSTOM_SIGNATURE: '/Signature.txt',
} as const;

export const CUSTOM_HEADINGS = {
  OTS_CUSTOM_HEADING: 'OWNER TRANSPORT SERVICES',
  VARL_CUSTOM_HEADING: 'VIJAY ANDHRA ROADLINES',
} as const;

export const PREDEFINED_DIMENSIONS = {
  MEMO_HEIGHT: '296mm',
  MEMO_WIDTH: '260mm',
  SLIP_HEIGHT: '193mm',
  SLIP_WIDTH: '210mm',
} as const;

export const FILE_PATHS = {
  MEMO_PDF: join('views/memo_pdf.ejs'),
  SLIP_PDF: join('views/slip_pdf.ejs'),
} as const;
