import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PresenceItem } from '@presence-demo-root/common-data';
import { EMPTY, Observable, of, timer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DirectoryService } from '../directory-search/directory.service';
import { Store } from '@ngrx/store';
import { PresenceActions } from './action-types';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  lastPresenceItems: Map<string, PresenceItem> = new Map();

  constructor(private http: HttpClient, private directoryService: DirectoryService, private store: Store) {
    this.initBackgroundPresenceJob();
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


  private sendActionsIfChanged(items: PresenceItem[]) {
    let newCount = 0;
    let changeCount = 0;

    items.forEach(item => {
      const i = this.lastPresenceItems.get(item.id);
      if (i) {
        if (!_.isEqual(i, item)) {
          // console.log(`Presence item[] has been changed -> action`);
          changeCount++;
          this.store.dispatch(PresenceActions.presenceItemPushed({item}));
        }
      }
      else {
        // console.log('New presence item received -> action');
        newCount++;
        this.store.dispatch(PresenceActions.presenceItemPushed({item}));
      }
    });

    if (newCount || changeCount) {
      console.log(`PresenceActions dispatched - new:${newCount}, change:${changeCount}`);
    }
    // save current
    const itemsCopy = _.cloneDeep(items);
    itemsCopy.forEach(item => {
      this.lastPresenceItems.set(item.id, item);
    })
    // console.log('Presence items saved: ', this.lastPresenceItems);
  }

  private initBackgroundPresenceJob() {
    // Fetch presence entries by current directory search
    // and compare with previous result.
    // If it's different then send an action to add it to store.
    timer(100, 5000).pipe(
      tap(v => console.log('PRESENCE BACKGROUND ...')),
      switchMap(v => this.getPresenceByDirectorySearch()),
    ).subscribe(
      items => {
        // console.log('PRESENCE BACKGROUND - presence items found:', items);
        this.sendActionsIfChanged(items);
      }
    )
  }
}
