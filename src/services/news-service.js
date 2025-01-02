import Parser from 'rss-parser';
import OpenAI from 'openai';
import { NEWS_FEEDS } from '../data/news-sources.js';

export class NewsService {
  constructor(openAiKey) {
    this.parser = new Parser();
    this.openai = new OpenAI({ apiKey: openAiKey });
  }

  async getLatestNews() {
    try {
      const feed = await this.parser.parseURL(NEWS_FEEDS.COINTELEGRAPH);
      const last24Hours = this.filterLast24Hours(feed.items);
      
      return {
        articles: last24Hours.map(item => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          description: item.contentSnippet
        })),
        summary: await this.generateSummary(last24Hours)
      };
    } catch (error) {
      console.error('Error fetching news:', error);
      throw new Error('Failed to fetch crypto news');
    }
  }

  filterLast24Hours(articles) {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return articles.filter(article => {
      const pubDate = new Date(article.pubDate);
      return pubDate >= twentyFourHoursAgo;
    });
  }

  async generateSummary(articles) {
    if (articles.length === 0) {
      return "No significant crypto news in the last 24 hours.";
    }

    try {
      const content = articles
        .map(a => `${a.title}\n${a.contentSnippet || ''}`)
        .join('\n\n');

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: "You are a crypto news analyst. Provide a brief, 2-3 sentence summary of the main crypto news trends from these articles."
        }, {
          role: "user",
          content
        }]
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error generating summary:', error);
      return "Summary generation unavailable.";
    }
  }
}