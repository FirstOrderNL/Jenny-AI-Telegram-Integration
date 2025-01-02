<?php if (!defined('ABSPATH')) exit; ?>

<div class="wrap jenny-ai-chat-settings">
    <h1>Jenny AI Chat Settings</h1>

    <form method="post" action="options.php">
        <?php
        settings_fields('jenny_ai_chat_options');
        do_settings_sections('jenny_ai_chat_options');
        ?>

        <table class="form-table" role="presentation">
            <tr>
                <th scope="row">Jenny's Avatar</th>
                <td>
                    <div class="jenny-avatar-preview">
                        <?php $avatar_url = get_option('jenny_ai_chat_avatar'); ?>
                        <img src="<?php echo esc_url($avatar_url ?: JENNY_AI_CHAT_PLUGIN_URL . 'assets/images/default-avatar.png'); ?>" 
                             alt="Jenny AI Avatar" 
                             id="jenny-avatar-preview">
                    </div>
                    <input type="hidden" 
                           name="jenny_ai_chat_avatar" 
                           id="jenny_ai_chat_avatar" 
                           value="<?php echo esc_attr($avatar_url); ?>">
                    <button type="button" class="button" id="upload-avatar-btn">Upload Avatar</button>
                    <p class="description">Upload an avatar for Jenny (recommended size: 128x128px)</p>
                </td>
            </tr>
            <tr>
                <th scope="row">CoinMarketCap API Key</th>
                <td>
                    <input type="password" 
                           name="jenny_ai_chat_coinmarketcap_key" 
                           value="<?php echo esc_attr(get_option('jenny_ai_chat_coinmarketcap_key')); ?>" 
                           class="regular-text">
                    <p class="description">Enter your CoinMarketCap API key for crypto price data.</p>
                </td>
            </tr>
            <tr>
                <th scope="row">OpenAI API Key</th>
                <td>
                    <input type="password" 
                           name="jenny_ai_chat_openai_key" 
                           value="<?php echo esc_attr(get_option('jenny_ai_chat_openai_key')); ?>" 
                           class="regular-text">
                    <p class="description">Enter your OpenAI API key for AI chat functionality.</p>
                </td>
            </tr>
            <tr>
                <th scope="row">Socket.IO Server URL</th>
                <td>
                    <input type="text" 
                           name="jenny_ai_chat_socket_url" 
                           value="<?php echo esc_attr(get_option('jenny_ai_chat_socket_url', 'http://localhost:3000')); ?>" 
                           class="regular-text">
                    <p class="description">Enter the URL of your Socket.IO server.</p>
                </td>
            </tr>
        </table>

        <div class="jenny-ai-chat-shortcode">
            <h2>Shortcode</h2>
            <p>Use this shortcode to display the chat widget: <code>[jenny_chat]</code></p>
        </div>

        <?php submit_button('Save Settings'); ?>
    </form>
</div>