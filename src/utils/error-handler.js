export function handleError(bot, chatId, error) {
  console.error('Bot Error:', error);
  bot.sendMessage(
    chatId,
    "I apologize, but I encountered an error processing your request. Please try again later."
  );
}