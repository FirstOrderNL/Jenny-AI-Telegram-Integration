import { ChatInput } from './components/ChatInput.js';
import { ChatControls } from './components/ChatControls.js';
import { ChatMessages } from './components/ChatMessages.js';
import { DOMUtils } from './utils/DOMUtils.js';

export class ChatUI {
  constructor() {
    this.widget = document.getElementById('chat-widget');
    this.messages = new ChatMessages();
    this.input = new ChatInput((message) => this.handleMessage(message));
    this.controls = new ChatControls(
      () => this.clearChat(),
      () => this.toggleChat()
    );
    
    this.initEscapeListener();
    this.showWelcomeMessage();
  }

  initEscapeListener() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeChat();
      }
    });
  }

  showWelcomeMessage() {
    this.messages.append('Hi! I\'m Jenny, your On-Chain reporter. Ask me about crypto prices or the latest blockchain news!');
  }

  handleMessage(message) {
    this.messages.append(message, true);
    // Here you would typically send the message to your backend
    // and handle the response
  }

  clearChat() {
    this.messages.clear();
    this.showWelcomeMessage();
  }

  toggleChat() {
    const isVisible = this.widget.style.display !== 'none';
    DOMUtils.setDisplay(this.widget, !isVisible);
    
    if (!isVisible) {
      this.input.focus();
    }
  }

  closeChat() {
    DOMUtils.setDisplay(this.widget, false);
  }
}