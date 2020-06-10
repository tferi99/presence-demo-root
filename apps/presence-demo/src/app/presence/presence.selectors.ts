import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPresence from './presence.reducer';
import { AppPresenceItem } from '../model/app-presence-item';
import { PresenceState } from '@presence-demo-root/common-data';
import { Dictionary } from '@ngrx/entity';

export const selectPresenceState = createFeatureSelector<fromPresence.PresenceState>(fromPresence.presenceFeatureKey);


export const selectAllPresence = createSelector(
  selectPresenceState,
  fromPresence.selectAll
);

export const selectEntitiesPresence = createSelector(
  selectPresenceState,
  fromPresence.selectEntities
);

// id in props
export const selectPresenceById = createSelector(
  selectEntitiesPresence,
  (presences: Dictionary<AppPresenceItem>, props) => presences[props.id]
)

export const selectPresenceStateById = createSelector(
  selectPresenceById,
  (presence: AppPresenceItem, props) => {
    if (presence) {
      return presence.state;
    }
    return PresenceState.INITIAL;
  }
)

// props: {olderThan} timestamp to choose old entries
export const selectOldPresentsIds = createSelector(
  selectAllPresence,
  (presences: AppPresenceItem[], props) => {
    return presences.filter(p => p.lastKeepAlive < props.olderThan).map(p => p.id)
  }
)

/**
 * Feature-relative version of selectOldPresentsIds
 */
export const _selectOldPresentsIds = createSelector(
  fromPresence.selectAll,
  (presences: AppPresenceItem[], props) => {
    return presences.filter(p => p.lastKeepAlive < props.olderThan).map(p => p.id)
  }
)

/**
 * Where lastKeepAlive is still empty
 */
export const _selectNewPresentsIds = createSelector(
  fromPresence.selectAll,
  (presences: AppPresenceItem[], props) => {
    return presences.filter(p => p.lastKeepAlive === undefined).map(p => p.id)
  }
)

/*
export interface PresenceDecoratorInfo {
  found: number
  notfound: number
}

export const selectPresenceForDirectorySearch = (dirMembers: DirectoryMemberWithPresence[]) => createSelector(
  selectPresenceEntities,
  (presences: Dictionary<AppPresenceItem>) => {
    const info: PresenceDecoratorInfo = {found: 0, notfound: 0};
    dirMembers.forEach(m => {
      const ps = presences[m.name];
      if (ps) {
        info.found++;
        m.presenceState = ps.state;
      } else {
        info.notfound++;
      }
    });
    //console.log('Decoration directory search with presence:', info);
    return dirMembers;
  }
);
*/

