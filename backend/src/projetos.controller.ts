import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProjetosService } from './projetos.service';

@Controller('projetos')
export class ProjetosController {
  constructor(private readonly projetosService: ProjetosService) {}

  @Get('andamento')
  async getAndamento() {
    return this.projetosService.getAndamento();
  }

  @Post('andamento')
  async saveAndamento(@Body() lista: any[]) {
    await this.projetosService.saveAndamento(lista);
    return { success: true };
  }

  @Get('concluidos')
  async getConcluidos() {
    return this.projetosService.getConcluidos();
  }

  @Post('concluidos')
  async saveConcluidos(@Body() lista: any[]) {
    await this.projetosService.saveConcluidos(lista);
    return { success: true };
  }
}
