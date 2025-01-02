export class ChatMessages {
    constructor() {
        this.container = document.getElementById('jenny-ai-chat-messages');
        this.avatarUrl = window.jennyAiChat?.avatarUrl || '';
        this.bindEvents();
    }

    bindEvents() {
        const clearButton = document.querySelector('.jenny-clear-chat');
        if (clearButton) {
            clearButton.addEventListener('click', () => this.clearChat());
        }
    }

    append(content, isUser = false) {
        if (!this.container) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'jenny-message'}`;

        if (!isUser && this.avatarUrl) {
            const avatar = document.createElement('img');
            avatar.src = this.avatarUrl;
            avatar.className = 'jenny-avatar';
            avatar.alt = 'Jenny AI Avatar';
            messageDiv.appendChild(avatar);
        }

        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        textDiv.textContent = content;
        messageDiv.appendChild(textDiv);
        
        this.container.appendChild(messageDiv);
        this.scrollToBottom();
    }

    clearChat() {
        if (this.container) {
            this.container.innerHTML = '';
            this.append('Hi! I\'m Jenny, your On-Chain reporter. Ask me about crypto prices or the latest blockchain news!');
        }
    }

    scrollToBottom() {
        if (this.container) {
            this.container.scrollTop = this.container.scrollHeight;
        }
    }
}