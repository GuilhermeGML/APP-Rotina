"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
console.log('Caminho tarefas pendentes:', path.resolve(__dirname, '../../data/tarefas-pendentes.json'));
console.log('Caminho tarefas concluídas:', path.resolve(__dirname, '../../data/tarefas-concluidas.json'));
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path = require("path");
let TasksService = class TasksService {
    dataDir = path.resolve(__dirname, '../../data');
    pendingPath = path.join(this.dataDir, 'tarefas-pendentes.json');
    donePath = path.join(this.dataDir, 'tarefas-concluidas.json');
    async ensureDataFilesExist() {
        try {
            await fs_1.promises.mkdir(this.dataDir, { recursive: true });
            try {
                await fs_1.promises.access(this.pendingPath);
            }
            catch {
                await fs_1.promises.writeFile(this.pendingPath, JSON.stringify([], null, 2));
            }
            try {
                await fs_1.promises.access(this.donePath);
            }
            catch {
                await fs_1.promises.writeFile(this.donePath, JSON.stringify([], null, 2));
            }
        }
        catch (error) {
            console.error('Error ensuring data files exist:', error);
            throw error;
        }
    }
    async readJsonFile(filePath) {
        try {
            await this.ensureDataFilesExist();
            const data = await fs_1.promises.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error(`Error reading ${filePath}:`, error);
            return [];
        }
    }
    async getPendingTasks() {
        return this.readJsonFile(this.pendingPath);
    }
    async getDoneTasks() {
        return this.readJsonFile(this.donePath);
    }
    async savePendingTasks(tasks) {
        try {
            await this.ensureDataFilesExist();
            await fs_1.promises.writeFile(this.pendingPath, JSON.stringify(tasks, null, 2));
        }
        catch (error) {
            console.error('Error saving pending tasks:', error);
            throw error;
        }
    }
    async saveDoneTasks(tasks) {
        try {
            await this.ensureDataFilesExist();
            await fs_1.promises.writeFile(this.donePath, JSON.stringify(tasks, null, 2));
        }
        catch (error) {
            console.error('Error saving done tasks:', error);
            throw error;
        }
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=tasks.service.js.map