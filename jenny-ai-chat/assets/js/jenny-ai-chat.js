import { ChatToggle } from './modules/chat-toggle.js';
import { ChatMessages } from './modules/chat-messages.js';
import { ChatForm } from './modules/chat-form.js';

document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = new ChatToggle();
    const chatMessages = new ChatMessages();
    
    const handleMessage = (message) => {
        chatMessages.append(message, true);
        
        // Send to server and handle response
        jQuery.ajax({
            url: jennyAiChat.ajaxUrl,
            method: 'POST',
            data: {
                action: 'jenny_ai_chat_message',
                nonce: jennyAiChat.nonce,
                message: message
            },
            success: (response) => {
                if (response.success) {
                    chatMessages.append(response.data.message);
                }
            },
            error: () => {
                chatMessages.append('Sorry, I encountered an error. Please try again.');
            }
        });
    };

    const chatForm = new ChatForm(handleMessage);
    
    // Show initial greeting
    chatMessages.append('Hi! I\'m Jenny, your On-Chain reporter. Ask me about crypto prices or the latest blockchain news!');
});