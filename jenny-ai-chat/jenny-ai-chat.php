<?php
/**
 * Plugin Name: Jenny AI Crypto Chat
 * Description: A chatbot interface for cryptocurrency prices and news powered by AI
 * Version: 1.0.0
 * Author: StackBlitz
 * Text Domain: jenny-ai-chat
 */

if (!defined('ABSPATH')) {
    exit;
}

// Plugin constants
define('JENNY_AI_CHAT_VERSION', '1.0.0');
define('JENNY_AI_CHAT_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('JENNY_AI_CHAT_PLUGIN_URL', plugin_dir_url(__FILE__));

// Activation hook
register_activation_hook(__FILE__, 'jenny_ai_chat_activate');

function jenny_ai_chat_activate() {
    // Check PHP version
    if (version_compare(PHP_VERSION, '7.4', '<')) {
        deactivate_plugins(plugin_basename(__FILE__));
        wp_die('Jenny AI Chat requires PHP 7.4 or higher.');
    }

    // Initialize default options
    add_option('jenny_ai_chat_openai_key', '');
    add_option('jenny_ai_chat_coinmarketcap_key', '');
    add_option('jenny_ai_chat_socket_url', 'http://localhost:3000');
    add_option('jenny_ai_chat_avatar', '');
}

// Load core plugin files
require_once JENNY_AI_CHAT_PLUGIN_DIR . 'includes/class-jenny-ai-chat.php';

// Initialize the plugin
function jenny_ai_chat_init() {
    $plugin = new Jenny_AI_Chat();
    $plugin->init();
}
add_action('plugins_loaded', 'jenny_ai_chat_init');