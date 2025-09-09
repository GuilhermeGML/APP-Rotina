export declare class TasksService {
    private dataDir;
    private pendingPath;
    private donePath;
    private ensureDataFilesExist;
    private readJsonFile;
    getPendingTasks(): Promise<string[]>;
    getDoneTasks(): Promise<string[]>;
    savePendingTasks(tasks: string[]): Promise<void>;
    saveDoneTasks(tasks: string[]): Promise<void>;
}
