import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function handleAIResponse(message) {
  try {
    const completion = await openai.chat.completions.create({
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

    // Analyze the message to determine intent
    if (message.toLowerCase().includes('price') || message.toLowerCase().includes('value')) {
      const cryptoMatch = message.match(/bitcoin|eth|bnb|ada|dot/i);
      if (cryptoMatch) {
        return {
          intent: 'crypto_price',
          crypto: cryptoMatch[0]
        };
      }
    }

    if (message.toLowerCase().includes('news')) {
      const topicMatch = message.match(/bitcoin|ethereum|crypto/i);
      return {
        intent: 'news',
        topic: topicMatch ? topicMatch[0] : 'general'
      };
    }

    return {
      intent: 'chat',
      message: completion.choices[0].message.content
    };
  } catch (error) {
    console.error('Error processing AI response:', error);
    throw new Error('Unable to process AI response');
  }
}