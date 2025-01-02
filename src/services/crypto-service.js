import axios from 'axios';
import { CRYPTO_ALIASES } from '../data/crypto-symbols.js';
import { formatPrice } from '../utils/price-formatter.js';

export class CryptoService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://pro-api.coinmarketcap.com/v1';
    this.symbolCache = new Map();
  }

  async initializeSymbolCache() {
    try {
      const response = await axios.get(`${this.baseUrl}/cryptocurrency/map`, {
        headers: this.getHeaders()
      });

      if (response.data?.data) {
        // Add common aliases first
        Object.entries(CRYPTO_ALIASES).forEach(([name, symbol]) => {
          this.symbolCache.set(name.toLowerCase(), symbol);
        });

        // Add all cryptocurrencies from the API
        response.data.data.forEach(coin => {
          this.symbolCache.set(coin.name.toLowerCase(), coin.symbol);
          this.symbolCache.set(coin.symbol.toLowerCase(), coin.symbol);
        });
        
        console.log('Symbol cache initialized with', this.symbolCache.size, 'entries');
      }
    } catch (error) {
      console.error('Failed to initialize symbol cache:', error.response?.data || error.message);
    }
  }

  async getPrice(symbol) {
    try {
      const upperSymbol = symbol.toUpperCase();
      const response = await axios.get(`${this.baseUrl}/cryptocurrency/quotes/latest`, {
        headers: this.getHeaders(),
        params: {
          symbol: upperSymbol,
          convert: 'USD'
        }
      });

      if (response.data?.data?.[upperSymbol]) {
        const data = response.data.data[upperSymbol];
        const price = data.quote.USD.price;
        const change24h = data.quote.USD.percent_change_24h;
        
        return {
          symbol: upperSymbol,
          price: formatPrice(price),
          change24h: change24h,
          lastUpdated: data.quote.USD.last_updated
        };
      }
      
      throw new Error('Invalid response format from CoinMarketCap API');
    } catch (error) {
      console.error('CoinMarketCap API Error:', error.response?.data || error.message);
      throw new Error(`Could not fetch price for ${symbol}`);
    }
  }

  async findSymbol(query) {
    if (this.symbolCache.size === 0) {
      await this.initializeSymbolCache();
    }
    return this.symbolCache.get(query.toLowerCase()) || null;
  }

  getHeaders() {
    return {
      'X-CMC_PRO_API_KEY': this.apiKey,
      'Accept': 'application/json'
    };
  }
}