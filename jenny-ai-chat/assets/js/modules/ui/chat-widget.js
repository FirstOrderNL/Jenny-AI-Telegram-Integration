export class ChatWidget {
    constructor() {
        this.element = document.querySelector('.jenny-ai-chat-widget');
        this.messagesContainer = document.querySelector('#jenny-ai-chat-messages');
    }

    show() {
        this.element?.classList.add('active');
    }

    hide() {
        this.element?.classList.remove('active');
    }

    isVisible() {
        return this.element?.classList.contains('active') ?? false;
    }

    appendMessage(content, isUser = false) {
        if (!this.messagesContainer) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${isUser ? 'user-message' : 'jenny-message'}`;
        messageElement.innerHTML = content;
        
        this.messagesContainer.appendChild(messageElement);
        this.scrollToBottom();
    }

    scrollToBottom() {
        if (this.messagesContainer) {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
    }
}