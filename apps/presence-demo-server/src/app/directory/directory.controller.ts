import { Controller, Get, Param, Query } from '@nestjs/common';
import { DirectoryService } from './directory.service';
import { DirectoryMember } from '@presence-demo-root/common-data';

@Controller('directory')
export class DirectoryController {
  constructor(private directoryService: DirectoryService) {}

  @Get('/')
  getAll(): DirectoryMember[] {
    return this.directoryService.getAll();
  }

  @Get('/name/:str')
  findByName(@Param('str')str, @Query('withPresence')withPresence?: string): DirectoryMember[] {
    const pres =  (withPresence === 'true' || withPresence === '1');
    return this.directoryService.findByName(str);
  }



  @Get('/phone/:str')
  findByPhone(@Param('str')str): DirectoryMember[] {
    return this.directoryService.findByPhone(str);
  }
}
