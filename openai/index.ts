import OpenAI from "openai";

export class OpenAIClass {
    private client: OpenAI;

    constructor() {
        this.client = new OpenAI();
    }

    async sendMessage(message: string): Promise<string> {
        try {
            const response = await this.client.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
            });

            return response.choices[0].message.content ?? '';
        } catch (error) {
            console.error('Error sending message to OpenAI:', error);
            throw error;
        }
    }
}
