import dotenv from 'dotenv';
import { initializeBot } from './telegram/bot-setup.js';
import { setupCommands } from './telegram/commands.js';
import { setupMessageHandler } from './telegram/message-handler.js';
import { setupMarketCommands } from './telegram/market-commands.js';
import { CryptoService } from './services/crypto-service.js';
import { OpenAIService } from './services/openai-service.js';
import { MarketService } from './services/market-service.js';
import { NewsService } from './services/news-service.js';

dotenv.config();

async function startBot() {
  const bot = initializeBot(process.env.TELEGRAM_BOT_TOKEN);
  const cryptoService = new CryptoService(process.env.COINMARKETCAP_API_KEY);
  const openAIService = new OpenAIService(process.env.OPENAI_API_KEY);
  const marketService = new MarketService(process.env.COINMARKETCAP_API_KEY);
  const newsService = new NewsService(process.env.OPENAI_API_KEY);

  // Initialize services
  await cryptoService.initializeSymbolCache();

  // Setup bot functionality
  setupCommands(bot);
  setupMessageHandler(bot, cryptoService, openAIService);
  setupMarketCommands(bot, marketService, newsService);

  console.log('Jenny AI Telegram Bot is running...');
}

startBot().catch(console.error);