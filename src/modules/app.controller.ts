import { Controller, Get, Header, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/slip/ots')
  handleRoot() {
    return;
  }

  @Get('health')
  @Header('Content-Type', 'text/plain')
  healthCheck() {
    return this.appService.checkHealth();
  }
}
