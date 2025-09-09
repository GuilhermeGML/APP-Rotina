import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('pending')
  async getPending() {
    return this.tasksService.getPendingTasks();
  }

  @Get('done')
  async getDone() {
    return this.tasksService.getDoneTasks();
  }

  @Post('pending')
  async savePending(@Body() body: { tasks: string[] }) {
    await this.tasksService.savePendingTasks(body.tasks);
    return { success: true };
  }

  @Post('done')
  async saveDone(@Body() body: { tasks: string[] }) {
    await this.tasksService.saveDoneTasks(body.tasks);
    return { success: true };
  }
}
