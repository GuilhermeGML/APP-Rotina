export declare class TasksService {
    private pendingPath;
    private donePath;
    getPendingTasks(): Promise<string[]>;
    getDoneTasks(): Promise<string[]>;
    savePendingTasks(tasks: string[]): Promise<void>;
    saveDoneTasks(tasks: string[]): Promise<void>;
}
