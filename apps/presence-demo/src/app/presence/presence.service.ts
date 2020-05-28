import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DirectoryMember, PresenceItem } from '@presence-demo-root/common-data';
import { EMPTY, from, Observable, of, Subject, timer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DirectoryService } from '../directory-search/directory.service';
import { Store } from '@ngrx/store';
import { presencesPushed } from './presence.actions';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  lastPresenceItems: string;

  constructor(private http: HttpClient, private directoryService: DirectoryService, private store: Store) {
    timer(100, 5000).pipe(
      tap(v => console.log('PRESENCE BACKGROUND')),
      switchMap(v => this.getPresenceByDirectorySearch())
    ).subscribe(
      items => {
        console.log('PRESENCE BACKGROUND - presence received:', items);
        this.sendActionIfChanged(items);
      }
    )
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


  private sendActionIfChanged(items: PresenceItem[]) {
    const itemsStr = JSON.stringify(items);
    if (this.lastPresenceItems !== itemsStr) {
      this.store.dispatch(presencesPushed({items}));
    }
    this.lastPresenceItems = itemsStr;
  }
}
