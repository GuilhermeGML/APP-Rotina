import { ProjetosService } from './projetos.service';
export declare class ProjetosController {
    private readonly projetosService;
    constructor(projetosService: ProjetosService);
    getAndamento(): Promise<any[]>;
    saveAndamento(lista: any[]): Promise<{
        success: boolean;
    }>;
    getConcluidos(): Promise<any[]>;
    saveConcluidos(lista: any[]): Promise<{
        success: boolean;
    }>;
}
