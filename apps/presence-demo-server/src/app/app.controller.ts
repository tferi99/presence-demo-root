import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { CommonData } from '@presence-demo-root/common-data';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  get(): string {
    return 'OK';
  }

  @Get('/hello')
  getData(): CommonData {
    return this.appService.getData();
  }
}
