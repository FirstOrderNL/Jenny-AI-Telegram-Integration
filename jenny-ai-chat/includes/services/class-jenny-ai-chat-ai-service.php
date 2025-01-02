<?php
class Jenny_AI_Chat_AI_Service {
    private $api_key;

    public function __construct($api_key) {
        $this->api_key = $api_key;
    }

    public function get_response($message) {
        $url = 'https://api.openai.com/v1/chat/completions';
        $response = wp_remote_post($url, [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->api_key,
                'Content-Type' => 'application/json'
            ],
            'body' => json_encode([
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'You are Jenny, an On-Chain reporter specializing in cryptocurrency and blockchain news. Keep responses concise and informative.'
                    ],
                    [
                        'role' => 'user',
                        'content' => $message
                    ]
                ]
            ])
        ]);

        if (is_wp_error($response)) {
            return 'Sorry, I encountered an error processing your request.';
        }

        $body = json_decode(wp_remote_retrieve_body($response), true);
        if (isset($body['choices'][0]['message']['content'])) {
            return $body['choices'][0]['message']['content'];
        }

        return 'Sorry, I encountered an error processing your request.';
    }
}