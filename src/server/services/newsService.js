import Parser from 'rss-parser';

const parser = new Parser();
const RSS_FEEDS = {
  bitcoin: 'https://cointelegraph.com/rss/tag/bitcoin',
  ethereum: 'https://cointelegraph.com/rss/tag/ethereum',
  general: 'https://cointelegraph.com/rss'
};

export async function fetchNews(topic = 'general') {
  try {
    const feed = await parser.parseURL(RSS_FEEDS[topic.toLowerCase()] || RSS_FEEDS.general);
    return feed.items.slice(0, 5).map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('Unable to fetch news');
  }
}