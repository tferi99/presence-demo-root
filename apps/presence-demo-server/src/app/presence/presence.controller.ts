import { Controller, Get, Param } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { PresenceItem } from '@presence-demo-root/common-data';

@Controller('presence')
export class PresenceController {
  constructor(private presenceService: PresenceService) {}

/*  @Get('observed')
  getObservedPresenceItemCount() {
    this.presenceService.getObservedPresenceItemCount();
  }*/

  @Get('')
  getAll(): PresenceItem[] {
    return this.presenceService.getAll();
  }

  @Get('/:str')
  findById(@Param('str')str): PresenceItem[] {
    return this.presenceService.findById(str);
  }

}
