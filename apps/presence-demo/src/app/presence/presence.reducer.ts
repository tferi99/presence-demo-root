import { Action, createReducer, on } from '@ngrx/store';
import * as PresenceActions from './presence.actions';
import { PresenceItem } from '@presence-demo-root/common-data';

export const presenceFeatureKey = 'presence';

export interface PresenceState {
  items: PresenceItem[]
}

export const initialState: PresenceState = {
  items: []
};

export const reducer = createReducer(
  initialState,

/*  on(PresenceActions.presenceItemPushed, (state, {items}) => {
    return {...state, items};
  }),*/
 );

