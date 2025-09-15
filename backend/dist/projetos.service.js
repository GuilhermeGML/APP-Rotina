"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjetosService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path = require("path");
let ProjetosService = class ProjetosService {
    dataDir = path.join(process.cwd(), 'data');
    getDateString() {
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0');
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const ano = hoje.getFullYear();
        return `${dia}-${mes}-${ano}`;
    }
    getAndamentoPath() {
        return path.join(this.dataDir, `projetos-andamento-${this.getDateString()}.json`);
    }
    getConcluidosPath() {
        return path.join(this.dataDir, `projetos-concluidos-${this.getDateString()}.json`);
    }
    async getAndamento() {
        try {
            const data = await fs_1.promises.readFile(this.getAndamentoPath(), 'utf-8');
            return JSON.parse(data);
        }
        catch {
            return [];
        }
    }
    async saveAndamento(lista) {
        await fs_1.promises.writeFile(this.getAndamentoPath(), JSON.stringify(lista, null, 2));
    }
    async getConcluidos() {
        try {
            const data = await fs_1.promises.readFile(this.getConcluidosPath(), 'utf-8');
            return JSON.parse(data);
        }
        catch {
            return [];
        }
    }
    async saveConcluidos(lista) {
        await fs_1.promises.writeFile(this.getConcluidosPath(), JSON.stringify(lista, null, 2));
    }
};
exports.ProjetosService = ProjetosService;
exports.ProjetosService = ProjetosService = __decorate([
    (0, common_1.Injectable)()
], ProjetosService);
//# sourceMappingURL=projetos.service.js.map