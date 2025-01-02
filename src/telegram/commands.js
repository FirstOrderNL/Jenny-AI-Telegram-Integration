export function setupCommands(bot) {
  // Start command
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      `Hi! I'm Jenny, your On-Chain reporter. Here are my commands:

/jenny [question] - Ask me about crypto prices or news
/top10 - View top 10 cryptocurrencies
/market - Get global market overview
/news - Latest crypto news
/help - Show this help message

Example: /jenny What's the Bitcoin price?`
    );
  });

  // Help command
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      `Here's how to use me:

Main Commands:
• /jenny [question] - Ask anything about crypto
• /top10 - Top 10 cryptocurrencies
• /market - Global market overview
• /news - Latest crypto news

Examples:
• /jenny What's the Bitcoin price?
• /jenny Tell me about Ethereum
• /jenny How much is DOGE worth?

Try any command now!`
    );
  });
}