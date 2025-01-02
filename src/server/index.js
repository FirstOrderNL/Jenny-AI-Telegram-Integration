import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { fetchCryptoPrice } from './services/cryptoService.js';
import { fetchNews } from './services/newsService.js';
import { handleAIResponse } from './services/aiService.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', async (message) => {
    try {
      // Process the message and determine the intent
      const response = await handleAIResponse(message);
      
      // If crypto price request
      if (response.intent === 'crypto_price') {
        const price = await fetchCryptoPrice(response.crypto);
        socket.emit('response', {
          type: 'price',
          data: price,
          message: `The current price of ${response.crypto} is $${price}`
        });
      }
      // If news request
      else if (response.intent === 'news') {
        const news = await fetchNews(response.topic);
        socket.emit('response', {
          type: 'news',
          data: news,
          message: 'Here are the latest news articles:'
        });
      }
      // General conversation
      else {
        socket.emit('response', {
          type: 'chat',
          message: response.message
        });
      }
    } catch (error) {
      socket.emit('error', { message: 'Sorry, I encountered an error processing your request.' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});