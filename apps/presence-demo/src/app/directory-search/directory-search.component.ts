import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DirectoryMember } from '@presence-demo-root/common-data';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { DirectoryService } from './directory.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, distinctUntilChanged, map, shareReplay, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'presence-demo-root-directories',
  templateUrl: './directory-search.component.html',
  styleUrls: ['./directory-search.component.css']
})
export class DirectorySearchComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;
  members$: Observable<DirectoryMember[]>;
  faSearch = faSearch;

  constructor(private directoryService: DirectoryService) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const startVal = this.directoryService.previousNameSearch ? this.directoryService.previousNameSearch : '';

    this.members$ = fromEvent<any>(this.searchInput.nativeElement, 'keyup').pipe(
      map(event => event.target.value),
      startWith(startVal),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(search => this.search(search)),
      shareReplay()
    );
  }

  search(search = ''): Observable<DirectoryMember[]> {
    if (search === '') {
      return this.directoryService.empty();
    }
    return this.directoryService.searchByName(search);
  }
}
