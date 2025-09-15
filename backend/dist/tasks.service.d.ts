export declare class TasksService {
    private dataDir;
    private getDateString;
    private getPendingPath;
    private getDonePath;
    getPendingTasks(): Promise<string[]>;
    getDoneTasks(): Promise<string[]>;
    savePendingTasks(tasks: string[]): Promise<void>;
    saveDoneTasks(tasks: string[]): Promise<void>;
}
