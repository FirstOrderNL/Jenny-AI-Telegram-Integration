export class ChatForm {
    constructor(onSubmit) {
        this.form = document.getElementById('jenny-ai-chat-form');
        this.input = document.getElementById('jenny-ai-chat-message');
        this.onSubmit = onSubmit;
        this.bindEvents();
    }

    bindEvents() {
        this.form?.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        const message = this.input?.value.trim();
        
        if (message && this.onSubmit) {
            this.onSubmit(message);
            this.input.value = '';
        }
    }
}