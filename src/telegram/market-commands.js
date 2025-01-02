import { handleError } from '../utils/error-handler.js';
import { formatDate } from '../utils/date-formatter.js';

export function setupMarketCommands(bot, marketService, newsService) {
  // Top 10 Command
  bot.onText(/\/top10/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      bot.sendChatAction(chatId, 'typing');
      const top10 = await marketService.getTop10();
      
      const message = ['📊 Top 10 Cryptocurrencies\n'];
      top10.forEach(coin => {
        const changeEmoji = coin.change24h >= 0 ? '📈' : '📉';
        message.push(
          `${coin.rank}. ${coin.symbol}`,
          `💰 $${coin.price}`,
          `${changeEmoji} ${coin.change24h.toFixed(2)}%\n`
        );
      });
      
      bot.sendMessage(chatId, message.join('\n'));
    } catch (error) {
      handleError(bot, chatId, error);
    }
  });

  // Market Command
  bot.onText(/\/market/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      bot.sendChatAction(chatId, 'typing');
      const metrics = await marketService.getGlobalMetrics();
      
      const message = [
        '🌍 Global Crypto Market',
        `\nMarket Cap: $${metrics.totalMarketCap}`,
        `24h Volume: $${metrics.totalVolume24h}`,
        `BTC Dominance: ${metrics.btcDominance}%`,
        `ETH Dominance: ${metrics.ethDominance}%`
      ];
      
      bot.sendMessage(chatId, message.join('\n'));
    } catch (error) {
      handleError(bot, chatId, error);
    }
  });

  // News Command
  bot.onText(/\/news/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      bot.sendChatAction(chatId, 'typing');
      const newsData = await newsService.getLatestNews();
      
      const message = [
        '📰 Latest Crypto News (24h)',
        `\n${newsData.summary}\n`,
        '\n🗞 Recent Headlines:'
      ];

      newsData.articles.slice(0, 5).forEach((article, index) => {
        message.push(
          `\n${index + 1}. ${article.title}`,
          `🕒 ${formatDate(article.pubDate)}`
        );
      });
      
      bot.sendMessage(chatId, message.join('\n'));
    } catch (error) {
      handleError(bot, chatId, error);
    }
  });
}