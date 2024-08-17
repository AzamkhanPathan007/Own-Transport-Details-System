import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

expand(config());

export const WEB_URL = process.env.WEB_URL!,
  PORT = process.env.PORT!;
