<?php
class Jenny_AI_Chat_Crypto_Service {
    private $api_key;

    public function __construct($api_key) {
        $this->api_key = $api_key;
    }

    public function get_price($symbol) {
        $url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
        $response = wp_remote_get($url, [
            'headers' => [
                'X-CMC_PRO_API_KEY' => $this->api_key
            ],
            'body' => [
                'symbol' => $symbol,
                'convert' => 'USD'
            ]
        ]);

        if (is_wp_error($response)) {
            return false;
        }

        $body = json_decode(wp_remote_retrieve_body($response), true);
        if (isset($body['data'][$symbol]['quote']['USD']['price'])) {
            return number_format($body['data'][$symbol]['quote']['USD']['price'], 2);
        }

        return false;
    }
}