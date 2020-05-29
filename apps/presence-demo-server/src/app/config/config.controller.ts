import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ConfigService } from './config.service';
import { AppConfig } from '@presence-demo-root/common-data';

@Controller('config')
export class ConfigController {
  constructor(private configService: ConfigService) {}

  @Get('')
  getConfig(): AppConfig {
    const cfg = this.configService.getConfig();
    console.log('getConfig():', cfg);
    return cfg;
  }

  @Put('')
  setConfig(@Body('config')config: AppConfig) {
    this.configService.setConfig(config);
    const cfg = this.getConfig();
    console.log('setConfig(): ', cfg);
    return cfg;
  }
}
