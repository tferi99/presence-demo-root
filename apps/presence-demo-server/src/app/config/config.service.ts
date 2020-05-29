import { Injectable } from '@nestjs/common';
import { AppConfig } from '@presence-demo-root/common-data';

@Injectable()
export class ConfigService {
  config: AppConfig = {
    autoChangePresenceStates: true
  };

  getConfig(): AppConfig {
    return this.config;
  }

  setConfig(config: AppConfig) {
    this.config = config;
  }
}
