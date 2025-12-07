import { NODE_ENVIRONMENT } from '../constants/common.constants';

export default function getEnvFilePath(): string {
	switch (process.env.NODE_ENV) {
		case NODE_ENVIRONMENT.TEST:
			return '.env.test';
		case NODE_ENVIRONMENT.PRODUCTION:
			return '.env.prod';
		default:
			return '.env';
	}
}
