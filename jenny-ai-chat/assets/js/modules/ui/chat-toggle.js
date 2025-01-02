export class ChatToggle {
    constructor() {
        this.widget = document.querySelector('.jenny-ai-chat-widget');
        this.toggleButton = document.querySelector('.jenny-toggle-button');
        this.closeButton = document.querySelector('.jenny-close-button');
        
        if (!this.widget || !this.toggleButton || !this.closeButton) {
            console.error('Required chat elements not found');
            return;
        }
        
        this.initializeListeners();
    }

    initializeListeners() {
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
            if (this.isVisible() && 
                !this.widget.contains(e.target) && 
                !this.toggleButton.contains(e.target)) {
                this.close();
            }
        });
    }

    toggle() {
        if (this.isVisible()) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.widget.style.display = 'block';
        setTimeout(() => {
            this.widget.classList.add('active');
        }, 0);
    }

    close() {
        this.widget.classList.remove('active');
        setTimeout(() => {
            this.widget.style.display = 'none';
        }, 300); // Match transition duration
    }

    isVisible() {
        return this.widget.style.display === 'block';
    }
}