document.addEventListener('DOMContentLoaded', function() {
    const widget = document.querySelector('.jenny-ai-chat-widget');
    const container = document.querySelector('.jenny-ai-chat-container');
    const toggleBtn = document.querySelector('.jenny-toggle-button');
    const closeBtn = document.querySelector('.jenny-close-button');

    if (!widget || !container || !toggleBtn || !closeBtn) return;

    function toggleChat(e) {
        e.preventDefault();
        e.stopPropagation();
        widget.classList.toggle('active');
        container.classList.toggle('active');
    }

    function closeChat(e) {
        e.preventDefault();
        e.stopPropagation();
        widget.classList.remove('active');
        container.classList.remove('active');
    }

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', closeChat);

    // Close on outside click for mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 640) {
            if (!container.contains(e.target) && !toggleBtn.contains(e.target)) {
                widget.classList.remove('active');
                container.classList.remove('active');
            }
        }
    });
});