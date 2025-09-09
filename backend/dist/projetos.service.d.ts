export declare class ProjetosService {
    private andamentoPath;
    private concluidosPath;
    getAndamento(): Promise<any[]>;
    saveAndamento(lista: any[]): Promise<void>;
    getConcluidos(): Promise<any[]>;
    saveConcluidos(lista: any[]): Promise<void>;
}
