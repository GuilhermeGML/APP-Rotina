export declare class ProjetosService {
    private dataDir;
    private getDateString;
    private getAndamentoPath;
    private getConcluidosPath;
    getAndamento(): Promise<any[]>;
    saveAndamento(lista: any[]): Promise<void>;
    getConcluidos(): Promise<any[]>;
    saveConcluidos(lista: any[]): Promise<void>;
}
