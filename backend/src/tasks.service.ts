
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class TasksService {
  private pendingPath = path.join(process.cwd(), 'data', 'tarefas-pendentes.json');
  private donePath = path.join(process.cwd(), 'data', 'tarefas-concluidas.json');

  async getPendingTasks(): Promise<string[]> {
    try {
      const data = await fs.readFile(this.pendingPath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async getDoneTasks(): Promise<string[]> {
    try {
      const data = await fs.readFile(this.donePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async savePendingTasks(tasks: string[]): Promise<void> {
    await fs.writeFile(this.pendingPath, JSON.stringify(tasks, null, 2));
  }

  async saveDoneTasks(tasks: string[]): Promise<void> {
    await fs.writeFile(this.donePath, JSON.stringify(tasks, null, 2));
  }
}
