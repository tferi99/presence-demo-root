import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonData } from '@presence-demo-root/common-data';
import { PresenceService } from './presence/presence.service';

@Component({
  selector: 'presence-demo-root-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'presence-search-demo';
  hello$ = this.http.get<CommonData>('/api/hello');

  constructor(private http: HttpClient, private presenceService: PresenceService) {
  }
}
