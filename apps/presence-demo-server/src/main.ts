/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DirectoryService } from './app/directory/directory.service';
import { PresenceService } from './app/presence/presence.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // init services
  app.get(DirectoryService).init();
  const dirItems = app.get(DirectoryService).getAll();
  app.get(PresenceService).init(dirItems);

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
