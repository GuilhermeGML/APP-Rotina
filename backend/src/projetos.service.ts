// Serviço para manipular arquivos JSON de projetos
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class ProjetosService {
  private andamentoPath = path.join(process.cwd(), 'data', 'projetos-andamento.json');
  private concluidosPath = path.join(process.cwd(), 'data', 'projetos-concluidos.json');

  async getAndamento(): Promise<any[]> {
    try {
      const data = await fs.readFile(this.andamentoPath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async saveAndamento(lista: any[]): Promise<void> {
    await fs.writeFile(this.andamentoPath, JSON.stringify(lista, null, 2));
  }

  async getConcluidos(): Promise<any[]> {
    try {
      const data = await fs.readFile(this.concluidosPath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async saveConcluidos(lista: any[]): Promise<void> {
    await fs.writeFile(this.concluidosPath, JSON.stringify(lista, null, 2));
  }
}
