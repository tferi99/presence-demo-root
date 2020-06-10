import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';


@Injectable()
export class PresenceEffects {

  loadPresences$ = createEffect(() => this.actions$.pipe(
    //tap(action => console.log('Action catched by PresenceEffects:', action)),
  ), {dispatch: false});

/*  presenceCleanup$ = createEffect(() => this.actions$.pipe(
    ofType(PresenceActions.presenceCleanup),
    withLatestFrom(this.store.pipe(select(selectOldPresentsIds, {olderThan: action.olderThan})),
    map(([action: Action, store: AppState]) => removePresenceItems({ids: []})
  )));*/

/*    withLatestFrom(this.store),
    .map(([action: Action, store: AppState]) => {
        return removePresenceItems({ids: []);
    }*/

/*    tap(action => {
      console.log('presenceCleanup$ ===> ', this.store);
      const oldPresIds: string[] = selectOldPresentsIds(this.store, {olderThan: action.olderThan});
      return removePresenceItems({ids: oldPresIds});
    })*/

/*
  on(PresenceActions.presenceCleanup,(state: PresenceState, action: {olderThan}) => {
  console.log(`PRESENCE CLEAUP (${action.olderThan}).....`, state);
const oldPresIds: string[] = selectOldPresentsIds(state, {olderThan: action.olderThan});
console.log('PRESENCE CLEANEDUP ->', oldPresIds);
return adapter.removeMany(oldPresIds, state);
}),
*/

constructor(private actions$: Actions, private store: Store<AppState>) {}
}
