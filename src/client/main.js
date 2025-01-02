import { io } from 'socket.io-client';
import { ChatUI } from './js/chat-ui.js';
import { SocketHandler } from './js/socket-handler.js';
import './style.css';

// Initialize chat components
const socket = io('http://localhost:3000');
const chatUI = new ChatUI();
const socketHandler = new SocketHandler(socket, chatUI);

// Setup form handling
const chatForm = document.getElementById('chat-form');
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  
  if (!message) return;
  
  chatUI.appendMessage(message, true);
  socketHandler.sendMessage(message);
  messageInput.value = '';
});

// Show initial greeting
chatUI.appendMessage('Hi! I\'m Jenny, your On-Chain reporter. Ask me about crypto prices or the latest blockchain news!');