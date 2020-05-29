export interface CommonData {
  code: number;
  message: string;
}

export enum PresenceState {
  NA = 'white',
  Free = 'green',
  Tentative = 'blue',
  Busy = 'red',
  OOF = 'yellow'
};

export interface DirectoryMember {
  name: string;
  phone: string;
}

export interface SubscriberPresenceState {
  subscriberId: string;
  state: PresenceState;
}

export interface PresenceItem {
  id: string;
  state: PresenceState;
  subStates: string[]
}

export interface AppConfig {
  autoChangePresenceStates: boolean;
}
