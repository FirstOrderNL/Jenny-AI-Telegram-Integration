import { TOKEN_INFO } from '../data/token-info.js';

export function isJennyTokenQuery(message) {
  const keywords = ['jenai', 'jenny ai token', 'buy jenny', 'jenny token'];
  return keywords.some(keyword => 
    message.toLowerCase().includes(keyword)
  );
}

export function getJennyTokenResponse() {
  return `🚀 Jenny AI Token (JENAI)\n\n` +
         `View JENAI token on DEXScreener:\n` +
         `${TOKEN_INFO.JENAI.dexscreener}`;
}