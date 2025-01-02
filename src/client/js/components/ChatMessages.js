export class ChatMessages {
  constructor() {
    this.container = document.getElementById('chat-messages');
  }

  append(content, isUser = false) {
    if (!this.container) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`;
    
    const bubble = document.createElement('div');
    bubble.className = `max-w-[70%] p-3 rounded-lg ${
      isUser ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'
    }`;
    bubble.textContent = content;
    
    messageDiv.appendChild(bubble);
    this.container.appendChild(messageDiv);
    this.scrollToBottom();
  }

  clear() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }

  scrollToBottom() {
    if (this.container) {
      this.container.scrollTop = this.container.scrollHeight;
    }
  }
}