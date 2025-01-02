import axios from 'axios';
import { formatPrice, formatPriceChange } from '../utils/price-formatter.js';

export class MarketService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://pro-api.coinmarketcap.com/v1';
  }

  async getTop10() {
    try {
      const response = await axios.get(`${this.baseUrl}/cryptocurrency/listings/latest`, {
        headers: {
          'X-CMC_PRO_API_KEY': this.apiKey
        },
        params: {
          limit: 10,
          convert: 'USD'
        }
      });

      return response.data.data.map(coin => ({
        rank: coin.cmc_rank,
        symbol: coin.symbol,
        price: formatPrice(coin.quote.USD.price),
        change24h: coin.quote.USD.percent_change_24h
      }));
    } catch (error) {
      console.error('Error fetching top 10:', error);
      throw new Error('Failed to fetch top 10 cryptocurrencies');
    }
  }

  async getGlobalMetrics() {
    try {
      const response = await axios.get(`${this.baseUrl}/global-metrics/quotes/latest`, {
        headers: {
          'X-CMC_PRO_API_KEY': this.apiKey
        }
      });

      const data = response.data.data;
      return {
        totalMarketCap: formatPrice(data.quote.USD.total_market_cap),
        btcDominance: data.btc_dominance.toFixed(2),
        ethDominance: data.eth_dominance.toFixed(2),
        totalVolume24h: formatPrice(data.quote.USD.total_volume_24h)
      };
    } catch (error) {
      console.error('Error fetching market data:', error);
      throw new Error('Failed to fetch market data');
    }
  }
}