interface DueObject {
    string: string;
    isRecurring: boolean;
    date: string;
    datetime?: string | null | undefined;
    timezone?: string | null | undefined;
    lang?: string | null | undefined;
}

export interface TodoistGetTasksRes {
    id: string;
    content: string;
    due: DueObject | null;
}