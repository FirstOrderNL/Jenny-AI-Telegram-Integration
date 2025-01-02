export class ChatControls {
    constructor(chatWidget) {
        this.chatWidget = chatWidget;
        this.toggleButton = document.querySelector('.jenny-toggle-button');
        this.closeButton = document.querySelector('.jenny-close-button');
        this.form = document.querySelector('#jenny-ai-chat-form');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.toggleButton?.addEventListener('click', () => this.handleToggle());
        this.closeButton?.addEventListener('click', () => this.handleClose());
        this.form?.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Global event listeners
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleToggle() {
        this.chatWidget.isVisible() ? this.chatWidget.hide() : this.chatWidget.show();
    }

    handleClose() {
        this.chatWidget.hide();
    }

    handleOutsideClick(event) {
        if (!this.chatWidget.isVisible()) return;
        
        const isClickOutside = !event.target.closest('.jenny-ai-chat-widget') && 
                             !event.target.closest('.jenny-toggle-button');
        
        if (isClickOutside) {
            this.chatWidget.hide();
        }
    }

    handleKeyPress(event) {
        if (event.key === 'Escape' && this.chatWidget.isVisible()) {
            this.chatWidget.hide();
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const input = event.target.querySelector('#jenny-ai-chat-message');
        if (!input) return;

        const message = input.value.trim();
        if (!message) return;

        this.chatWidget.appendMessage(message, true);
        input.value = '';
        
        // Trigger custom event for message handling
        const customEvent = new CustomEvent('jenny-message-sent', { detail: { message } });
        document.dispatchEvent(customEvent);
    }
}