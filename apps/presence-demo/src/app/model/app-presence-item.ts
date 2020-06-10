import { PresenceItem } from '../../../../../libs/common-data/src/lib/common-data';

export interface AppPresenceItem extends PresenceItem {
  lastKeepAlive: number
}
