import OpenAI from 'openai';

export class OpenAIService {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });
  }

  async getResponse(message) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are Jenny, an On-Chain reporter specializing in cryptocurrency and blockchain news. Keep responses concise and informative."
          },
          {
            role: "user",
            content: message
          }
        ]
      });
      return completion.choices[0].message.content;
    } catch (error) {
      throw new Error(`OpenAI Error: ${error.message}`);
    }
  }
}