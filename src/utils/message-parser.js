export class MessageParser {
  static isPriceQuery(message) {
    const priceKeywords = ['price', 'worth', 'value', 'cost', 'how much'];
    return priceKeywords.some(keyword => message.toLowerCase().includes(keyword));
  }

  static async extractCryptoSymbol(message, cryptoService) {
    const words = message.toLowerCase().split(/\s+/);
    
    // Common cryptocurrency name variations
    const cryptoAliases = {
      'dogecoin': 'DOGE',
      'doge': 'DOGE',
      'bitcoin': 'BTC',
      'btc': 'BTC',
      'ethereum': 'ETH',
      'eth': 'ETH'
    };

    // First check for direct matches in aliases
    for (const word of words) {
      if (cryptoAliases[word]) {
        return cryptoAliases[word];
      }
    }

    // Then try the symbol cache for other cryptocurrencies
    for (const word of words) {
      const symbol = await cryptoService.findSymbol(word);
      if (symbol) {
        return symbol;
      }
    }

    return null;
  }
}