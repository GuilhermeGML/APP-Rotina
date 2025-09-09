
console.log('Caminho tarefas pendentes:', path.resolve(__dirname, '../../data/tarefas-pendentes.json'));
console.log('Caminho tarefas concluídas:', path.resolve(__dirname, '../../data/tarefas-concluidas.json'));
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class TasksService {
  private dataDir = path.resolve(__dirname, '../../data');
  private pendingPath = path.join(this.dataDir, 'tarefas-pendentes.json');
  private donePath = path.join(this.dataDir, 'tarefas-concluidas.json');

  private async ensureDataFilesExist() {
    try {
      // Create data directory if it doesn't exist
      await fs.mkdir(this.dataDir, { recursive: true });
      
      // Create empty JSON files if they don't exist
      try {
        await fs.access(this.pendingPath);
      } catch {
        await fs.writeFile(this.pendingPath, JSON.stringify([], null, 2));
      }
      
      try {
        await fs.access(this.donePath);
      } catch {
        await fs.writeFile(this.donePath, JSON.stringify([], null, 2));
      }
    } catch (error) {
      console.error('Error ensuring data files exist:', error);
      throw error;
    }
  }

  private async readJsonFile(filePath: string): Promise<string[]> {
    try {
      await this.ensureDataFilesExist();
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error);
      return [];
    }
  }

  async getPendingTasks(): Promise<string[]> {
    return this.readJsonFile(this.pendingPath);
  }

  async getDoneTasks(): Promise<string[]> {
    return this.readJsonFile(this.donePath);
  }

  async savePendingTasks(tasks: string[]): Promise<void> {
    try {
      await this.ensureDataFilesExist();
      await fs.writeFile(this.pendingPath, JSON.stringify(tasks, null, 2));
    } catch (error) {
      console.error('Error saving pending tasks:', error);
      throw error;
    }
  }

  async saveDoneTasks(tasks: string[]): Promise<void> {
    try {
      await this.ensureDataFilesExist();
      await fs.writeFile(this.donePath, JSON.stringify(tasks, null, 2));
    } catch (error) {
      console.error('Error saving done tasks:', error);
      throw error;
    }
  }
}
