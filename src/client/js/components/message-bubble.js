export class MessageBubble {
  static create(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'}`;
    
    const bubble = document.createElement('div');
    bubble.className = `max-w-[70%] p-3 rounded-lg ${
      isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
    }`;
    
    if (typeof content === 'string') {
      bubble.textContent = content;
    } else if (content.type === 'news') {
      bubble.appendChild(this.createNewsList(content.data));
    }
    
    messageDiv.appendChild(bubble);
    return messageDiv;
  }

  static createNewsList(newsItems) {
    const newsList = document.createElement('div');
    newsItems.forEach(article => {
      const articleLink = document.createElement('a');
      articleLink.href = article.link;
      articleLink.target = '_blank';
      articleLink.className = 'block hover:underline mb-2';
      articleLink.textContent = article.title;
      newsList.appendChild(articleLink);
    });
    return newsList;
  }
}