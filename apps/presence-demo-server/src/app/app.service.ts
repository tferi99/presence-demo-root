import { Injectable } from '@nestjs/common';
import { CommonData } from '@presence-demo-root/common-data';

@Injectable()
export class AppService {
  getData(): CommonData {
    return { message: 'Welcome to presence-search-demo-server!', code: 1234 };
  }
}
