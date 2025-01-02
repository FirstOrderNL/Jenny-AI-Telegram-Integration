import TelegramBot from 'node-telegram-bot-api';

export function initializeBot(token) {
  if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN is required');
  }
  return new TelegramBot(token, { polling: true });
}