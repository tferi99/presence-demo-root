import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AppConfig } from '@presence-demo-root/common-data';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable()
export class ConfigResolver implements Resolve<AppConfig> {

  constructor(private configService: ConfigService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AppConfig> | Promise<AppConfig> | AppConfig {
    return this.configService.getConfig();
  }
}
