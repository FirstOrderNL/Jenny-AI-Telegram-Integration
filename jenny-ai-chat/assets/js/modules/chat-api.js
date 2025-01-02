class ChatAPI {
    constructor() {
        this.ajaxUrl = jennyAiChat.ajaxUrl;
        this.nonce = jennyAiChat.nonce;
    }

    async sendMessage(message) {
        try {
            const response = await jQuery.ajax({
                url: this.ajaxUrl,
                method: 'POST',
                data: {
                    action: 'jenny_ai_chat_message',
                    nonce: this.nonce,
                    message: message
                }
            });

            if (response.success) {
                return response.data;
            } else {
                throw new Error(response.data.message || 'Failed to process message');
            }
        } catch (error) {
            console.error('Chat API Error:', error);
            throw error;
        }
    }
}

export default ChatAPI;