export class ChatControls {
  constructor(onClear, onClose) {
    this.clearButton = document.getElementById('clear-chat');
    this.closeButton = document.getElementById('close-chat');
    this.toggleButton = document.getElementById('toggle-chat');
    
    this.onClear = onClear;
    this.onClose = onClose;
    
    this.bindEvents();
  }

  bindEvents() {
    this.clearButton?.addEventListener('click', () => this.onClear());
    this.closeButton?.addEventListener('click', () => this.onClose());
    this.toggleButton?.addEventListener('click', () => this.onClose());
  }
}