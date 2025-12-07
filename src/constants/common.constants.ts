import { join } from 'node:path';

export const LOGO_PATHS = {
	OTS_COMPANY_LOGO: '/base64/otsLogo.txt',
	VARL_COMPANY_LOGO: '/base64/varlLogo.txt',
	CUSTOM_LOGO: '/base64/customLogo.txt',
	CUSTOM_SIGNATURE: '/base64/customSignature.txt',
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

export const PDF_FILE_PATHS = {
	MEMO_PDF: join('views/pdfTemplate/memoPdf.ejs'),
	SLIP_PDF: join('views/pdfTemplate/slipPdf.ejs'),
} as const;

export const TEMPLATE_FILE_PATHS = {
	OTS_MEMO: join('views/otsMemo.ejs'),
	OTS_SLIP: join('views/otsSlip.ejs'),
	VIJAY_MEMO: join('views/vijayMemo.ejs'),
	VIJAY_SLIP: join('views/vijaySlip.ejs'),
} as const;

export const CACHE_KEYS = {
	VARL_COMPANY_LOGO: 'VARL_COMPANY_LOGO',
	OTS_COMPANY_LOGO: 'OTS_COMPANY_LOGO',
	CUSTOM_LOGO: 'CUSTOM_LOGO',
	CUSTOM_SIGNATURE: 'CUSTOM_SIGNATURE',
} as const;

export const NODE_ENVIRONMENT = {
	LOCAL: 'local',
	PRODUCTION: 'production',
	TEST: 'test',
} as const;

export const PUPPETEER_ARGS = [
	'--no-sandbox',
	'--headless',
	'--disable-gpu',
	'--disable-dev-shm-usage',
];

export const WORKER_FILE_PATH = join(
	__dirname,
	'..',
	'..',
	'dist',
	'workers',
	'generatePdf.worker.js',
);
