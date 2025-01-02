export class ChatInput {
  constructor(onSubmit) {
    this.form = document.getElementById('chat-form');
    this.input = document.getElementById('message-input');
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
      this.clear();
    }
  }

  clear() {
    if (this.input) {
      this.input.value = '';
    }
  }

  focus() {
    this.input?.focus();
  }
}