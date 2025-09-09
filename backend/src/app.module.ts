import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProjetosController } from './projetos.controller';
import { ProjetosService } from './projetos.service';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [],
  controllers: [AppController, ProjetosController, TasksController],
  providers: [AppService, ProjetosService, TasksService],
})
export class AppModule {}
