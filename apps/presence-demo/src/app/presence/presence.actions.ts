import { createAction, props } from '@ngrx/store';
import { PresenceItem } from '@presence-demo-root/common-data';

export const presencesPushed = createAction(
  '[Presence] Presences Pushed', props<{items: PresenceItem[]}>()
);

