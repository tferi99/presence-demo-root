import { Injectable, Logger } from '@nestjs/common';
import { DirectoryMember, PresenceItem, PresenceState } from '@presence-demo-root/common-data';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PresenceService {
  private readonly log = new Logger(PresenceService.name);
  items: PresenceItem[] = [];
  stateChanges = 0;

  init(directoryMembers: DirectoryMember[]) {
    this.log.debug(`Initialization presence source entries for ${directoryMembers.length} directory entries`);
    directoryMembers.forEach(dm => {
        const item: PresenceItem = {id: dm.name, state: PresenceState.NA, subStates: ['1', '2', '3']};
        this.items.push(item);
      }
    )
  }

  createPresenceSubscriptionsForDir(members: DirectoryMember[]) {

  }

  //@Cron('0,10,20,30,40,50 * * * * *')
  @Cron('0,30 * * * * *')
  changePresenceState() {
    this.stateChanges++;
    this.log.debug(`[${this.stateChanges}]Presence state changing...`);

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
    const enumKey = values[Math.floor(Math.random() * values.length)];
    return enumeration[enumKey];
  }
}

