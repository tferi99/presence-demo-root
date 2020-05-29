import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig, PresenceItem } from '@presence-demo-root/common-data';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) { }

  getConfig(): Observable<AppConfig> {
    return this.http.get<AppConfig>('/api/config');
  }

  setConfig(config: AppConfig): Observable<AppConfig> {
    return this.http.put<AppConfig>('/api/config', {config});
  }
}
