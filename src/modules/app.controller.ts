import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('/slip/ots')
  handleRoot() {
    return;
  }

  @Get('health')
  healthCheck() {
    return { status: 'ok' };
  }
}
