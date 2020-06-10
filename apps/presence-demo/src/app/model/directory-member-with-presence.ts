import { DirectoryMember, PresenceState } from '@presence-demo-root/common-data';

export interface DirectoryMemberWithPresence extends DirectoryMember {
  presenceState?: PresenceState
}
