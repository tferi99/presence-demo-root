import { createReducer, on } from '@ngrx/store';
import * as PresenceActions from './presence.actions';
import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { AppPresenceItem } from '../model/app-presence-item';
import { _selectNewPresentsIds, _selectOldPresentsIds } from './presence.selectors';

export const presenceFeatureKey = 'presence';

export interface PresenceState extends EntityState<AppPresenceItem> {
  // additional entities state properties
}

export const adapter: EntityAdapter<AppPresenceItem> = createEntityAdapter<AppPresenceItem>();

export const initialState: PresenceState = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,

/*  on(PresenceActions.presenceItemsPushed,(state: PresenceState, action: {items}) => {
    action.items.forEach(i => {

    })
    //adapter.upsertOne(action.item, state)
  }),*/

  on(PresenceActions.killAllPresence,(state: PresenceState, action: {}) => adapter.removeAll(state)),

  on(PresenceActions.presenceKeepAlive,(state: PresenceState, action: {ids}) => {
    const now = Date.now();
    const changes: Update<AppPresenceItem>[] = [];
    action.ids.forEach(id => {
      changes.push({id, changes: {lastKeepAlive: now}})
    });
    return adapter.updateMany(changes, state);
  }),

  on(PresenceActions.presenceCleanup,(state: PresenceState, action: {olderThan}) => {
    // remove old entries
    const ids: string[] = _selectOldPresentsIds(state, {olderThan: action.olderThan});
    // const state2 =
    return adapter.removeMany(ids, state);

    // add timestamp where missing (for new items)
/*    const ids: string[] = _selectNewPresentsIds(state2, {olderThan: action.olderThan});
    const newState = adapter.updateMany(ids, state);*/

  }),

);

export const {
  selectAll, selectEntities
} = adapter.getSelectors();
