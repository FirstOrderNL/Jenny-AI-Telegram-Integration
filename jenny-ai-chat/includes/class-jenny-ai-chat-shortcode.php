<?php
class Jenny_AI_Chat_Shortcode {
    public function init() {
        add_action('wp_footer', array($this, 'render_chat_widget'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
    }

    public function enqueue_assets() {
        wp_enqueue_style('jenny-ai-chat', JENNY_AI_CHAT_PLUGIN_URL . 'assets/css/jenny-ai-chat.css', array(), JENNY_AI_CHAT_VERSION);
        wp_enqueue_script('jenny-ai-chat', JENNY_AI_CHAT_PLUGIN_URL . 'assets/js/jenny-ai-chat.js', array('jquery'), JENNY_AI_CHAT_VERSION, true);
        
        // Add avatar URL to JavaScript
        wp_localize_script('jenny-ai-chat', 'jennyAiChat', array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('jenny-ai-chat'),
            'avatarUrl' => get_option('jenny_ai_chat_avatar', JENNY_AI_CHAT_PLUGIN_URL . 'assets/images/default-avatar.png')
        ));
    }

    public function render_chat_widget() {
        include JENNY_AI_CHAT_PLUGIN_DIR . 'templates/chat-widget.php';
    }
}