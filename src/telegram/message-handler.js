import { MessageParser } from '../utils/message-parser.js';
import { formatPriceChange } from '../utils/price-formatter.js';
import { isJennyTokenQuery, getJennyTokenResponse } from '../utils/token-handler.js';

export function setupMessageHandler(bot, cryptoService, openAIService) {
  bot.onText(/\/jenny (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const message = match[1];

    try {
      await handleMessage(bot, chatId, message, cryptoService, openAIService);
    } catch (error) {
      handleError(bot, chatId, error);
    }
  });
}

async function handleMessage(bot, chatId, message, cryptoService, openAIService) {
  bot.sendChatAction(chatId, 'typing');

  if (isJennyTokenQuery(message)) {
    bot.sendMessage(chatId, getJennyTokenResponse());
    return;
  }

  if (MessageParser.isPriceQuery(message)) {
    await handlePriceQuery(bot, chatId, message, cryptoService);
    return;
  }

  const response = await openAIService.getResponse(message);
  bot.sendMessage(chatId, response);
}

async function handlePriceQuery(bot, chatId, message, cryptoService) {
  const symbol = await MessageParser.extractCryptoSymbol(message, cryptoService);
  if (symbol) {
    const data = await cryptoService.getPrice(symbol);
    const change = formatPriceChange(data.change24h);
    const changeEmoji = data.change24h >= 0 ? '📈' : '📉';
    
    const response = `${changeEmoji} ${symbol} Price:\n\n` +
                    `$${data.price}\n` +
                    `24h Change: ${change}`;
    
    bot.sendMessage(chatId, response);
    return;
  }
  
  bot.sendMessage(
    chatId, 
    "I couldn't identify the cryptocurrency. Try using the full name or symbol (e.g., Bitcoin, BTC, Ethereum, ETH)."
  );
}

function handleError(bot, chatId, error) {
  console.error('Error processing message:', error);
  bot.sendMessage(
    chatId,
    "I apologize, but I encountered an error processing your request. Please try again."
  );
}