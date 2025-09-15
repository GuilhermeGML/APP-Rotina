
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class TasksService {
  private dataDir = path.join(process.cwd(), 'data');

  private getDateString() {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    return `${dia}-${mes}-${ano}`;
  }

  private getPendingPath() {
    return path.join(this.dataDir, `tarefas-pendentes-${this.getDateString()}.json`);
  }
  private getDonePath() {
    return path.join(this.dataDir, `tarefas-concluidas-${this.getDateString()}.json`);
  }

  async getPendingTasks(): Promise<string[]> {
    try {
      const data = await fs.readFile(this.getPendingPath(), 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async getDoneTasks(): Promise<string[]> {
    try {
      const data = await fs.readFile(this.getDonePath(), 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async savePendingTasks(tasks: string[]): Promise<void> {
    await fs.writeFile(this.getPendingPath(), JSON.stringify(tasks, null, 2));
  }

  async saveDoneTasks(tasks: string[]): Promise<void> {
    await fs.writeFile(this.getDonePath(), JSON.stringify(tasks, null, 2));
  }
}
