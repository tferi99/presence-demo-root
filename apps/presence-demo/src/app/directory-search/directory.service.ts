import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DirectoryMember } from '@presence-demo-root/common-data';
import { EMPTY, empty, from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { fromArray } from 'rxjs/internal/observable/fromArray';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  previousNameSearch: string;

  constructor(private http: HttpClient) {}

  getAll(): Observable<DirectoryMember[]> {
    return this.http.get('/api/directory').pipe(
      map(res => Object.values((res as DirectoryMember))
      ));
  }

  searchByName(name = ''): Observable<DirectoryMember[]> {
    this.previousNameSearch = name;
    return this.http.get('/api/directory/name/' + name).pipe(
      map(res => Object.values((res as DirectoryMember))
      ));
  }

  empty(): Observable<DirectoryMember[]> {
    this.previousNameSearch = undefined;
    return of([]);
  }

  private searchByNameWithPresence(search = '', withPresence: boolean): Observable<DirectoryMember[]> {


    return this.http.get('/api/directory/name/' + search).pipe(
      map(res => Object.values((res as DirectoryMember))
      ));
  }

}
