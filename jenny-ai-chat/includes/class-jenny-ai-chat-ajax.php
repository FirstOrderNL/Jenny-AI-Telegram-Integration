<?php
class Jenny_AI_Chat_Ajax {
    private $processor;

    public function __construct() {
        $this->processor = new Jenny_AI_Chat_Processor();
    }

    public function init() {
        add_action('wp_ajax_jenny_ai_chat_message', array($this, 'handle_message'));
        add_action('wp_ajax_nopriv_jenny_ai_chat_message', array($this, 'handle_message'));
    }

    public function handle_message() {
        if (!check_ajax_referer('jenny-ai-chat', 'nonce', false)) {
            wp_send_json_error(array('message' => 'Invalid nonce'));
        }

        $message = sanitize_text_field($_POST['message']);
        if (empty($message)) {
            wp_send_json_error(array('message' => 'Message is required'));
        }

        $response = $this->processor->process_message($message);
        wp_send_json_success(array('message' => $response));
    }
}