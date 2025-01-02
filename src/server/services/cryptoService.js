import axios from 'axios';

export async function fetchCryptoPrice(symbol) {
  try {
    const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY
      },
      params: {
        symbol: symbol.toUpperCase()
      }
    });
    
    return response.data.data[symbol.toUpperCase()].quote.USD.price;
  } catch (error) {
    console.error('Error fetching crypto price:', error);
    throw new Error('Unable to fetch cryptocurrency price');
  }
}