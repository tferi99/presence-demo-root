import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DirectoryMember } from '@presence-demo-root/common-data';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { DirectoryService } from './directory.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  concatMap,
  debounceTime,
  distinctUntilChanged, first,
  map,
  mergeMap,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';
import { DirectoryMemberWithPresence } from '../model/directory-member-with-presence';
import { select, Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { PresenceActions } from '../presence/action-types';
import { PresenceService } from '../presence/presence.service';
import { presenceKeepAlive } from '../presence/presence.actions';
import { CHANGE_DETECTION_STRATEGY } from '../app-constants';
import { selectPresenceById } from '../presence/presence.selectors';
import * as fromPresence from '../presence/presence.reducer';

@Component({
  selector: 'presence-demo-root-directories',
  templateUrl: './directory-search.component.html',
  styleUrls: ['./directory-search.component.css'],
//  changeDetection: CHANGE_DETECTION_STRATEGY
})
export class DirectorySearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  members$: Observable<DirectoryMemberWithPresence[]>;
  faSearch = faSearch;
  searchSub: Subscription;
  searchResult: DirectoryMember[];
  keepaliveSub: Subscription;

  constructor(
    public directoryService: DirectoryService,
    private store: Store<AppState>,
    private presenceService: PresenceService
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const startVal = this.directoryService.previousNameSearch ? this.directoryService.previousNameSearch : '';

    this.searchSub = fromEvent<any>(this.searchInput.nativeElement, 'keyup').pipe(
      map(event => event.target.value),
      tap(v => console.log('search:' + v)),
      startWith(startVal),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(search => this.search(search)),
    ).subscribe(
        data => {
          this.searchResult = data

          if (this.keepaliveSub) {
            this.keepaliveSub.unsubscribe();
          }
          const ids = this.searchResult.map(d => d.name);
          this.keepaliveSub = this.presenceService.subscribeKeepAlive(ids);
        }
      )
  }

  ngOnDestroy(): void {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
    if (this.keepaliveSub) {
      this.keepaliveSub.unsubscribe();
    }
  }

  search(search = ''): Observable<DirectoryMember[]> {
    if (search === '') {
      return this.directoryService.empty();
    }
    return this.directoryService.searchByName(search);
  }

  killAllPresence() {
    this.store.dispatch(PresenceActions.killAllPresence());
  }

  getPresenceByIdSelector(id: string) {
    return this.store.pipe(
      select(selectPresenceById, {id})
    )
  }

  getNow(): number {
    return Date.now()
  }

  keepalive() {
    const ids = this.searchResult.map(d => d.name);
    this.store.dispatch(presenceKeepAlive({ids}));
  }

  test() {
    this.getPresenceByIdSelector('Jane 1').pipe(
      first()
    ).subscribe(
      v => console.log('data:', v)
    );
  }
}
