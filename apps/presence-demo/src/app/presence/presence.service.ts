import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PresenceItem } from '@presence-demo-root/common-data';
import { EMPTY, interval, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DirectoryService } from '../directory-search/directory.service';
import { Store } from '@ngrx/store';
import { PresenceActions } from './action-types';
import * as _ from 'lodash';
import { presenceCleanup, presenceKeepAlive } from './presence.actions';

const PUSH_POLLING_PERIOD = 5000;      // 5 secs
const PRESENCE_KEEPALIVE_PERIOD = 10000;      // 10 secs
export const OLD_PRESENCE_AGE = 2 * PRESENCE_KEEPALIVE_PERIOD;      // 20 secs
const PRESENCE_CLEANUP_PERIOD = 3 * PRESENCE_KEEPALIVE_PERIOD;     // cleaup after 3 PRESENCE_KEEPALIVE_PERIOD

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  constructor(
    private http: HttpClient,
    private directoryService: DirectoryService,
    private store: Store)
  {
    this.initPushSimulateJob();
    this.initPresenceCleanupJob();
  }

  init() {}

  getAll(): Observable<PresenceItem[]> {
    return this.http.get('/api/presence').pipe(
      map(res => Object.values((res as PresenceItem))
    ));
  }

  getPresenceByDirectorySearch(): Observable<PresenceItem[]> {
    const dirSearch = this.directoryService.previousNameSearch;
    // console.log('DIR_SEARCH: ' + dirSearch);
    if (!dirSearch) {
      return EMPTY;
    }
    return this.searchById(dirSearch);
  }


  /**
   * Search by ID or fragment.
   *
   * @param id
   */
  searchById(id = ''): Observable<PresenceItem[]> {
    console.log('presence search: ' + id);
    return this.http.get('/api/presence/' + id).pipe(
      map(res => Object.values((res as PresenceItem))
    ));
  }

  empty(): Observable<PresenceItem[]> {
    return of([]);
  }

  subscribeKeepAlive(ids: string[]) {
    return interval(PRESENCE_KEEPALIVE_PERIOD).pipe().subscribe(
      () => this.store.dispatch(presenceKeepAlive({ids}))
    )
  }

  // ----------------------------------- helpers ------------------------------------------
  private initPresenceCleanupJob() {
    interval(PRESENCE_CLEANUP_PERIOD).subscribe(
      () => this.store.dispatch(presenceCleanup({olderThan: Date.now() - OLD_PRESENCE_AGE}))
    );
  }

  private initPushSimulateJob() {
    // Fetch presence entries by current directory search
    // and compare with previous result.
    // If it's different then send an action to add it to store.
    interval(PUSH_POLLING_PERIOD).pipe(
      tap(v => console.log('PRESENCE BACKGROUND FOR PUSH SIMULATION ...')),
      switchMap(v => this.getPresenceByDirectorySearch()),
    ).subscribe(
      items => {
        console.log('PRESENCE BACKGROUND - presence items found:', items);
        this.store.dispatch(PresenceActions.presenceItemsPushed({items}));
      }
    )
  }
}
