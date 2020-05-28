import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DirectoryController } from './directory/directory.controller';
import { DirectoryService } from './directory/directory.service';
import { PresenceService } from './presence/presence.service';
import { PresenceController } from './presence/presence.controller';

@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  controllers: [
    AppController,
    DirectoryController,
    PresenceController
  ],
  providers: [
    AppService,
    DirectoryService,
    PresenceService
  ],
})
export class AppModule {}
