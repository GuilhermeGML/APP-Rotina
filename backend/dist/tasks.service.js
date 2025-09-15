"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path = require("path");
let TasksService = class TasksService {
    dataDir = path.join(process.cwd(), 'data');
    getDateString() {
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0');
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const ano = hoje.getFullYear();
        return `${dia}-${mes}-${ano}`;
    }
    getPendingPath() {
        return path.join(this.dataDir, `tarefas-pendentes-${this.getDateString()}.json`);
    }
    getDonePath() {
        return path.join(this.dataDir, `tarefas-concluidas-${this.getDateString()}.json`);
    }
    async getPendingTasks() {
        try {
            const data = await fs_1.promises.readFile(this.getPendingPath(), 'utf-8');
            return JSON.parse(data);
        }
        catch {
            return [];
        }
    }
    async getDoneTasks() {
        try {
            const data = await fs_1.promises.readFile(this.getDonePath(), 'utf-8');
            return JSON.parse(data);
        }
        catch {
            return [];
        }
    }
    async savePendingTasks(tasks) {
        await fs_1.promises.writeFile(this.getPendingPath(), JSON.stringify(tasks, null, 2));
    }
    async saveDoneTasks(tasks) {
        await fs_1.promises.writeFile(this.getDonePath(), JSON.stringify(tasks, null, 2));
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=tasks.service.js.map