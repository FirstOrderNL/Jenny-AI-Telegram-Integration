<?php
class Jenny_AI_Chat_Admin {
    public function init() {
        add_action('admin_menu', array($this, 'add_menu_page'));
        add_action('admin_init', array($this, 'register_settings'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
    }

    public function add_menu_page() {
        add_menu_page(
            'Jenny AI Chat Settings',
            'Jenny AI Chat',
            'manage_options',
            'jenny-ai-chat',
            array($this, 'render_settings_page'),
            'dashicons-format-chat',
            30
        );
    }

    public function enqueue_admin_assets($hook) {
        if ('toplevel_page_jenny-ai-chat' !== $hook) {
            return;
        }
        wp_enqueue_media();
        wp_enqueue_style('jenny-ai-chat-admin', JENNY_AI_CHAT_PLUGIN_URL . 'assets/css/admin.css', array(), JENNY_AI_CHAT_VERSION);
        wp_enqueue_script('jenny-ai-chat-admin', JENNY_AI_CHAT_PLUGIN_URL . 'assets/js/admin.js', array('jquery', 'media-upload'), JENNY_AI_CHAT_VERSION, true);
    }

    public function register_settings() {
        register_setting('jenny_ai_chat_options', 'jenny_ai_chat_coinmarketcap_key', array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default' => ''
        ));
        
        register_setting('jenny_ai_chat_options', 'jenny_ai_chat_openai_key', array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default' => ''
        ));
        
        register_setting('jenny_ai_chat_options', 'jenny_ai_chat_socket_url', array(
            'type' => 'string',
            'sanitize_callback' => 'esc_url_raw',
            'default' => 'http://localhost:3000'
        ));

        register_setting('jenny_ai_chat_options', 'jenny_ai_chat_avatar', array(
            'type' => 'string',
            'sanitize_callback' => 'esc_url_raw',
            'default' => ''
        ));
    }

    public function render_settings_page() {
        if (!current_user_can('manage_options')) {
            return;
        }
        require_once JENNY_AI_CHAT_PLUGIN_DIR . 'admin/settings-page.php';
    }
}