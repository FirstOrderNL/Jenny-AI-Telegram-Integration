<div class="jenny-ai-chat-wrapper">
    <button class="jenny-toggle-button" aria-label="Chat with Jenny AI">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20.5 3.5C18.2 1.2 15.2 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.7 6L0 24l6.3-1.7c1.8.9 3.8 1.5 5.7 1.5 6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5zm-8.5 18.4c-1.8 0-3.5-.5-5-1.3l-.4-.2-3.6 1 1-3.7-.2-.4c-1-1.6-1.5-3.4-1.5-5.2 0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10z"/>
        </svg>
    </button>

    <div class="jenny-ai-chat-widget">
        <div class="jenny-chat-actions">
            <button class="jenny-clear-chat" aria-label="Clear chat">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
            </button>
            <button class="jenny-close-button" aria-label="Close chat">×</button>
        </div>
        <div id="jenny-ai-chat-messages"></div>
        <div class="jenny-ai-chat-input">
            <form id="jenny-ai-chat-form">
                <input type="text" 
                       id="jenny-ai-chat-message" 
                       placeholder="Ask about crypto prices or news..."
                       aria-label="Chat message">
                <button type="submit">Send</button>
            </form>
        </div>
    </div>
</div>