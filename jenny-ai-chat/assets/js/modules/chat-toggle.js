export class ChatToggle {
    constructor() {
        this.widget = document.querySelector('.jenny-ai-chat-widget');
        this.toggleButton = document.querySelector('.jenny-toggle-button');
        this.closeButton = document.querySelector('.jenny-close-button');
        
        // Ensure elements exist
        if (!this.widget || !this.toggleButton || !this.closeButton) {
            console.error('Required chat elements not found');
            return;
        }
        
        this.bindEvents();
    }

    bindEvents() {
        // Use arrow functions to preserve 'this' context
        this.toggleButton.addEventListener('click', () => this.toggle());
        this.closeButton.addEventListener('click', () => this.close());
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.widget.classList.contains('active') && 
                !this.widget.contains(e.target) && 
                !this.toggleButton.contains(e.target)) {
                this.close();
            }
        });
    }

    toggle() {
        if (this.widget.classList.contains('active')) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.widget.classList.add('active');
        this.widget.style.display = 'flex';
    }

    close() {
        this.widget.classList.remove('active');
        setTimeout(() => {
            if (!this.widget.classList.contains('active')) {
                this.widget.style.display = 'none';
            }
        }, 300);
    }
}