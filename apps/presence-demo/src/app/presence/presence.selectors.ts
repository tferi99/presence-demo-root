import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPresence from './presence.reducer';

export const selectPresenceState = createFeatureSelector<fromPresence.PresenceState>(
  fromPresence.presenceFeatureKey
);
