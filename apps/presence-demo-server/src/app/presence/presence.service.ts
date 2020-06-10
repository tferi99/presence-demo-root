import { Injectable, Logger } from '@nestjs/common';
import { DirectoryMember, PresenceItem, PresenceState } from '@presence-demo-root/common-data';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '../config/config.service';

@Injectable()
export class PresenceService {
  private readonly log = new Logger(PresenceService.name);
  items: PresenceItem[] = [];
  stateChanges = 0;

  constructor(private configService: ConfigService) {
  }

  init(directoryMembers: DirectoryMember[]) {
    this.log.debug(`Initialization presence source entries for ${directoryMembers.length} directory entries`);
    directoryMembers.forEach(dm => {
        const item: PresenceItem = {id: dm.name, state: PresenceState.INITIAL, subStates: ['1', '2', '3']};
        this.items.push(item);
      }
    )
  }

  createPresenceSubscriptionsForDir(members: DirectoryMember[]) {

  }

  @Cron('0,30 * * * * *')
  changePresenceState() {
    if(!this.configService.getConfig().autoChangePresenceStates) {
      return;
    }
    this.stateChanges++;
    this.log.debug(`[${this.stateChanges}]Presence state changing by background job...`);

    const stateValues = this.items.values();
    this.items.forEach(ps => {
      const randomState = Math.floor(Math.random() * this.items.length);
      ps.state = this.getRandomState(PresenceState);
    });

    /*
    // log
    for (let n=0; n<3; n++) {
      this.log.debug(`    AppState[${n}] = ${this.items[n].state}`);
    }
    */
  }

/*  getObservedPresenceItemCount(): number {
    let count = 0;
    this.items.forEach(ps => {
      if (ps.notifier) {
        count++;
      }
    })
    return count;
  }*/

  getAll(): PresenceItem[] {
    return this.items;
  }

  findById(str: string): PresenceItem[] {
    const ret = [];
    const s = str.toLowerCase();
    this.items.forEach(i => {
      if (i.id.toLowerCase().indexOf(s) >= 0) {
        ret.push(i)
      }
    });
    return ret;
  }


  //--------------------------------------- helpers ----------------------------------
  private getRandomState = (enumeration) => {
    const values = Object.keys(enumeration);
    const enumKey = values[Math.floor(Math.random() * (values.length - 1)) + 1];    // don't return INITIAL (1st item)
    return enumeration[enumKey];
  }
}

