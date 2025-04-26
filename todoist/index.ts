import { TodoistApi } from '@doist/todoist-api-typescript'
import { TodoistGetTasksRes } from './interfaces'

export class TodoistClass {
    private client: TodoistApi

    constructor() {
        this.client = new TodoistApi(process.env.TODOIST_API_KEY as string)
    }

    async getTasks(): Promise<TodoistGetTasksRes[]> {
        try {
            const tasks = await this.client.getTasks()

            return tasks.results.map((task) => ({
                id: task.id,
                content: task.content,
                due: task.due,
            }))
        } catch (error) {
            console.error('Error fetching tasks from Todoist:', error)
            throw error
        }
    }

    async deleteTask(taskId: string): Promise<void> {
        try {
            await this.client.deleteTask(taskId)
        } catch (error) {
            console.error('Error deleting task from Todoist:', error)
            throw error
        }
    }

    async addTask(text: string): Promise<void> {
        try {
            await this.client.quickAddTask({ text })
        } catch (error) {
            console.error('Error adding task to Todoist:', error)
            throw error
        }
    }
}