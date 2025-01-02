# Jenny AI Crypto Chat WordPress Plugin

A WordPress plugin that integrates a chat interface powered by AI for cryptocurrency prices and news updates.

## Installation

1. Upload the `jenny-ai-chat` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Go to the Jenny AI Chat settings page and configure your API keys
4. Use the shortcode `[jenny_chat]` to display the chat widget on any page or post

## Configuration

1. CoinMarketCap API Key: Required for fetching real-time cryptocurrency prices
2. OpenAI API Key: Required for AI-powered chat responses
3. Socket.IO Server URL: The URL where your Node.js server is running

## Features

- Real-time cryptocurrency price updates
- Latest blockchain and crypto news
- AI-powered chat responses
- Customizable chat widget
- Admin settings page
- Shortcode support

## Requirements

- WordPress 5.0 or higher
- PHP 7.4 or higher
- Node.js server running the chat backend