import { OpenAIService } from './openai-service.js';
import { CryptoService } from './crypto-service.js';

export class ChatService {
  constructor() {
    this.openAIService = new OpenAIService(process.env.OPENAI_API_KEY);
    this.cryptoService = new CryptoService(process.env.COINMARKETCAP_API_KEY);
  }

  async processMessage(message) {
    try {
      if (this.isPriceQuery(message)) {
        const symbol = await this.extractCryptoSymbol(message);
        if (symbol) {
          const price = await this.cryptoService.getPrice(symbol);
          return `The current price of ${symbol} is $${price}`;
        }
      }
      return await this.openAIService.getResponse(message);
    } catch (error) {
      console.error('Chat processing error:', error);
      throw new Error('I apologize, but I encountered an issue processing your request. Please try again.');
    }
  }

  isPriceQuery(message) {
    const priceKeywords = ['price', 'worth', 'value', 'cost', 'how much'];
    return priceKeywords.some(keyword => message.toLowerCase().includes(keyword));
  }

  async extractCryptoSymbol(message) {
    const cryptoAliases = {
      'bitcoin': 'BTC',
      'ethereum': 'ETH',
      'dogecoin': 'DOGE',
      'doge': 'DOGE'
    };

    const words = message.toLowerCase().split(/\s+/);
    for (const word of words) {
      if (cryptoAliases[word]) {
        return cryptoAliases[word];
      }
    }
    return null;
  }
}