import readline from 'readline';
import dotenv from 'dotenv';
import { OpenAIService } from './src/services/openai-service.js';
import { CryptoService } from './src/services/crypto-service.js';
import { MessageParser } from './src/utils/message-parser.js';

dotenv.config();

class JennyChat {
  constructor() {
    this.openaiService = new OpenAIService(process.env.OPENAI_API_KEY);
    this.cryptoService = new CryptoService(process.env.COINMARKETCAP_API_KEY);
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async init() {
    console.log("Initializing cryptocurrency data...");
    await this.cryptoService.initializeSymbolCache();
    this.start();
  }

  async handleMessage(message) {
    try {
      if (MessageParser.isPriceQuery(message)) {
        const symbol = await MessageParser.extractCryptoSymbol(message, this.cryptoService);
        if (symbol) {
          const price = await this.cryptoService.getPrice(symbol);
          return `The current price of ${symbol} is $${price}`;
        }
      }
      return await this.openaiService.getResponse(message);
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }

  async start() {
    console.log("\nJenny AI Chat Test Interface");
    console.log("---------------------------");
    console.log("Type 'exit' to quit\n");
    console.log("Jenny: Hi! I'm Jenny, your On-Chain reporter. Ask me about any cryptocurrency price or blockchain news!\n");

    const askQuestion = () => {
      this.rl.question('You: ', async (input) => {
        if (input.toLowerCase() === 'exit') {
          console.log('\nJenny: Goodbye! Have a great day!');
          this.rl.close();
          return;
        }

        const response = await this.handleMessage(input);
        console.log(`\nJenny: ${response}\n`);
        askQuestion();
      });
    };

    askQuestion();
  }
}

const jenny = new JennyChat();
jenny.init();