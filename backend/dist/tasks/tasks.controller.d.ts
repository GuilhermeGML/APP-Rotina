import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    getPending(): Promise<string[]>;
    getDone(): Promise<string[]>;
    savePending(body: {
        tasks: string[];
    }): Promise<{
        success: boolean;
    }>;
    saveDone(body: {
        tasks: string[];
    }): Promise<{
        success: boolean;
    }>;
}
