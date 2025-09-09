"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjetosController = void 0;
const common_1 = require("@nestjs/common");
const projetos_service_1 = require("./projetos.service");
let ProjetosController = class ProjetosController {
    projetosService;
    constructor(projetosService) {
        this.projetosService = projetosService;
    }
    async getAndamento() {
        return this.projetosService.getAndamento();
    }
    async saveAndamento(lista) {
        await this.projetosService.saveAndamento(lista);
        return { success: true };
    }
    async getConcluidos() {
        return this.projetosService.getConcluidos();
    }
    async saveConcluidos(lista) {
        await this.projetosService.saveConcluidos(lista);
        return { success: true };
    }
};
exports.ProjetosController = ProjetosController;
__decorate([
    (0, common_1.Get)('andamento'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjetosController.prototype, "getAndamento", null);
__decorate([
    (0, common_1.Post)('andamento'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProjetosController.prototype, "saveAndamento", null);
__decorate([
    (0, common_1.Get)('concluidos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjetosController.prototype, "getConcluidos", null);
__decorate([
    (0, common_1.Post)('concluidos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProjetosController.prototype, "saveConcluidos", null);
exports.ProjetosController = ProjetosController = __decorate([
    (0, common_1.Controller)('projetos'),
    __metadata("design:paramtypes", [projetos_service_1.ProjetosService])
], ProjetosController);
//# sourceMappingURL=projetos.controller.js.map