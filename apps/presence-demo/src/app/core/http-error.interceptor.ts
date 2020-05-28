import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private store: Store<AppState>,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(0),                                                 // retry on error
      // tap(evt => this.log.trace('>>>>>> HTTP EVENT:', evt)), // this does not add much, you can track the same on the network tab
      catchError((err: HttpErrorResponse) => this.handleError(err))
    );
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    // console.log('error caught by interceptor:', error );
    let errorMessage = '';
    let errorMessageExt;
    if (err.error instanceof ErrorEvent) {                    // client-side error
      errorMessage = `Client Error: ${err.error.message}`;
    } else {                                                    // server-side error
      // this.log.debug('######### HTTP ERR:', err);
      switch (err.status) {
        case 404:
          errorMessage = 'Not found anything';
          break;
        case 504:
          errorMessage = 'Server Inaccessible';
          break;
        default:
          errorMessage = 'Unknown Error';
          errorMessageExt = `Error Code: ${err.status}\nMessage: ${err.message}`;
      }
    }

    if (errorMessageExt) {
      errorMessage += ' : ' + errorMessageExt;
    }

    if (errorMessage) {
      console.log('!!!!!!!!!!!!!!!! HTTP ERROR:', errorMessage);
      this.toastr.error(errorMessage);
    }
    return throwError(errorMessage);
  }
}
