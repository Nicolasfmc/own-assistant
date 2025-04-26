import cron from 'node-cron';
import { TodoistClass } from './todoist';
import { TodoistGetTasksRes } from './todoist/interfaces';
import { OpenAIClass } from './openai';

const todoist = new TodoistClass();
const openai = new OpenAIClass();

const checkTasks = async (): Promise<void> => {
  try {
    const tasks: TodoistGetTasksRes[] = await todoist.getTasks();

    const nearTasks = tasks.filter((task) => {
        if (task.due && task.due.date) {
            const dueDate = new Date(task.due.date);
            const now = new Date();

            return dueDate > now && dueDate < new Date(now.getTime() + (24 * 60 * 60 * 1000));
        }

        return false;
    });

    if (nearTasks.length > 0) {
      const taskContents = nearTasks.map((task) => task.content).join('\n');
      const message = `Tarefas próximas:\n${taskContents}\n\nAvise-me sobre essas tarefas.`;
      const response = await openai.sendMessage(message);
      console.log('Resposta do OpenAI:', response);
    } else {
      console.log('Nenhuma tarefa próxima encontrada.');
    }

  } catch (error) {
    console.error('Erro ao verificar tarefas:', error, new Date());
  }
};

cron.schedule('*/10 * * * *', () => {
  console.log('Iniciando verificação de tarefas...');
  checkTasks();
});

console.log('Cron job iniciado!');