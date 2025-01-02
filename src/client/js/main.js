import { ChatUI } from './ui/chat-ui.js';
import { ChatService } from './services/chat-service.js';
import '../css/chat.css';

document.addEventListener('DOMContentLoaded', () => {
  const chatUI = new ChatUI();
  const chatService = new ChatService();

  // Handle form submission
  document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Show user message
    chatUI.appendMessage(message, true);
    input.value = '';

    try {
      // Process message and show response
      const response = await chatService.processMessage(message);
      chatUI.appendMessage(response);
    } catch (error) {
      chatUI.showError(error.message);
    }
  });

  // Show initial greeting
  chatUI.appendMessage('Hi! I\'m Jenny, your On-Chain reporter. Ask me about crypto prices or the latest blockchain news!');
});