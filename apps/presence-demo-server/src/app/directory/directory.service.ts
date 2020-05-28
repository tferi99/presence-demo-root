import { Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { DirectoryMember } from '@presence-demo-root/common-data';

const firstnames = [
  'John',  'Michael', 'David', 'Chris', 'Mike', 'Christopher', 'Mark', 'Paul', 'Daniel', 'James', 'Maria', 'Lisa', 'Carol',
  'Sarah', 'Linda', 'Helen', 'Elizabeth', 'Susan', 'Charles', 'Edward', 'Kevin', 'Jason', 'Anthony', 'Robert'
];

const surnames = [
  'Smith', 'Jones', 'Williams', 'Taylor', 'Davies', 'Evans', 'Thomas', 'Johnson', 'Roberts', 'Walker',
  'Wright', 'Robinson', 'Thompson', 'White', 'Hughes', 'Edwards', 'Green', 'Lewis', 'Wood', 'Harris',
  'Martin', 'Jackson', 'Clarke', 'Adams', 'Allen', 'Atkinson', 'Brooks', 'Collins', 'Elliott', 'Morrison'
];

@Injectable()
export class DirectoryService {
  private readonly log = new Logger(DirectoryService.name);
  members: Map<string, string> = new Map();

  init() {
    this.members = this.generateMembers(1000);
  }

  getAll(): DirectoryMember[] {
    const ret = [];
    this.members.forEach((phone: string, name) => {
      ret.push({name, phone})
    });
    return ret;
  }

  findByName(str: string): DirectoryMember[] {
    const ret = [];
    const s = str.toLowerCase();
    this.members.forEach((phone: string, name) => {
      if (name.toLowerCase().indexOf(s) >= 0) {
        ret.push({name, phone})
      }
    });
    return ret;
  }

  findByPhone(str: string): DirectoryMember[] {
    const ret = [];
    const s = str.toLowerCase();
    this.members.forEach((phone: string, name) => {
      if (phone.toLowerCase().indexOf(s) >= 0) {
        ret.push({name, phone})
      }
    });
    return ret;
  }

  private generateMembers(num: number) {
    const members = new Map<string, string>();
    const fLen = firstnames.length;
    const sLen = surnames.length;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";

    while(members.size < num) {
      const fname = firstnames[Math.floor(Math.random() * fLen)];
      const sname = surnames[Math.floor(Math.random() * sLen)];
      const c = chars[Math.floor(Math.random() * chars.length)];
      const name = fname + ' ' + c + '. ' + sname;

      if (!members.has(name)) {
        let phone = '+36';
        const nlen = nums.length;
        for (let n=0; n<7; n++) {
          phone += nums[Math.floor(Math.random() * nlen)];
        }
        members.set(name, phone);
      }
    }

    this.log.debug(`Created ${members.size} random directory members.`)
    return members;
  }
}
