import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { PresenceActions } from './action-types';


@Injectable()
export class PresenceEffects {


  loadPresences$ = createEffect(() => this.actions$.pipe(
    //tap(action => console.log('Action catched by PresenceEffects:', action)),
/*  ofType(PresenceActions.presenceItemPushed),
    concatMap(() => EMPTY)
*/
  ), {dispatch: false});

  constructor(private actions$: Actions) {}
}
