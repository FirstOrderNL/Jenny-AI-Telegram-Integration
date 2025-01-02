<?php
class Jenny_AI_Chat {
    private $admin;
    private $shortcode;
    private $ajax;

    public function init() {
        if (!$this->check_dependencies()) {
            return;
        }

        $this->load_dependencies();
        $this->initialize_components();
        $this->register_hooks();
    }

    private function check_dependencies() {
        if (!function_exists('wp_remote_post')) {
            add_action('admin_notices', function() {
                echo '<div class="error"><p>Jenny AI Chat requires WordPress HTTP API.</p></div>';
            });
            return false;
        }
        return true;
    }

    private function load_dependencies() {
        require_once JENNY_AI_CHAT_PLUGIN_DIR . 'includes/class-jenny-ai-chat-admin.php';
        require_once JENNY_AI_CHAT_PLUGIN_DIR . 'includes/class-jenny-ai-chat-shortcode.php';
        require_once JENNY_AI_CHAT_PLUGIN_DIR . 'includes/class-jenny-ai-chat-ajax.php';
        require_once JENNY_AI_CHAT_PLUGIN_DIR . 'includes/class-jenny-ai-chat-processor.php';
        require_once JENNY_AI_CHAT_PLUGIN_DIR . 'includes/services/class-jenny-ai-chat-crypto-service.php';
        require_once JENNY_AI_CHAT_PLUGIN_DIR . 'includes/services/class-jenny-ai-chat-ai-service.php';
    }

    private function initialize_components() {
        $this->admin = new Jenny_AI_Chat_Admin();
        $this->admin->init();

        $this->shortcode = new Jenny_AI_Chat_Shortcode();
        $this->shortcode->init();

        $this->ajax = new Jenny_AI_Chat_Ajax();
        $this->ajax->init();
    }

    private function register_hooks() {
        add_action('wp_enqueue_scripts', array($this, 'register_assets'));
    }

    public function register_assets() {
        wp_register_style(
            'jenny-ai-chat',
            JENNY_AI_CHAT_PLUGIN_URL . 'assets/css/jenny-ai-chat.css',
            array(),
            JENNY_AI_CHAT_VERSION
        );

        wp_register_script(
            'jenny-ai-chat',
            JENNY_AI_CHAT_PLUGIN_URL . 'assets/js/jenny-ai-chat.js',
            array('jquery'),
            JENNY_AI_CHAT_VERSION,
            true
        );

        wp_localize_script('jenny-ai-chat', 'jennyAiChat', array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('jenny-ai-chat')
        ));
    }
}