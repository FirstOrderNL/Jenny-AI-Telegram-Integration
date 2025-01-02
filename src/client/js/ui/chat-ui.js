export class ChatUI {
  constructor() {
    this.initElements();
    this.initEventListeners();
    this.isOpen = false;
  }

  initElements() {
    this.widget = document.getElementById('chat-widget');
    this.toggleButton = document.getElementById('toggle-chat');
    this.closeButton = document.getElementById('close-chat');
    this.messageInput = document.getElementById('message-input');
    this.chatMessages = document.getElementById('chat-messages');
    this.chatForm = document.getElementById('chat-form');
  }

  initEventListeners() {
    this.toggleButton.addEventListener('click', () => this.toggleChat());
    this.closeButton.addEventListener('click', () => this.closeChat());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeChat();
      }
    });
    
    // Close on outside click for mobile
    document.addEventListener('click', (e) => {
      if (this.isOpen && 
          !this.widget.contains(e.target) && 
          !this.toggleButton.contains(e.target)) {
        this.closeChat();
      }
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    this.widget.style.display = this.isOpen ? 'block' : 'none';
    if (this.isOpen) {
      this.messageInput.focus();
    }
  }

  closeChat() {
    this.isOpen = false;
    this.widget.style.display = 'none';
  }

  appendMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'jenny-message'}`;
    
    if (!isUser) {
      const avatar = document.createElement('img');
      avatar.src = '/assets/images/jenny-avatar.png';
      avatar.className = 'message-avatar';
      messageDiv.appendChild(avatar);
    }
    
    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.textContent = content;
    messageDiv.appendChild(textDiv);
    
    this.chatMessages.appendChild(messageDiv);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    this.chatMessages.appendChild(errorDiv);
    this.scrollToBottom();
  }
}