// Serviço para manipular arquivos JSON de projetos
import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class ProjetosService {
  private dataDir = path.join(process.cwd(), 'data');

  private getDateString() {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    return `${dia}-${mes}-${ano}`;
  }

  private getAndamentoPath() {
    return path.join(this.dataDir, `projetos-andamento-${this.getDateString()}.json`);
  }
  private getConcluidosPath() {
    return path.join(this.dataDir, `projetos-concluidos-${this.getDateString()}.json`);
  }

  async getAndamento(): Promise<any[]> {
    try {
      // Busca o arquivo do dia, se não existir, retorna []
      const data = await fs.readFile(this.getAndamentoPath(), 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async saveAndamento(lista: any[]): Promise<void> {
    await fs.writeFile(this.getAndamentoPath(), JSON.stringify(lista, null, 2));
  }

  async getConcluidos(): Promise<any[]> {
    try {
      const data = await fs.readFile(this.getConcluidosPath(), 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async saveConcluidos(lista: any[]): Promise<void> {
    await fs.writeFile(this.getConcluidosPath(), JSON.stringify(lista, null, 2));
  }
}
