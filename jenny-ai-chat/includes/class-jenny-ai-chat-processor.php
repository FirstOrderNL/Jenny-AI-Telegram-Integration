<?php
class Jenny_AI_Chat_Processor {
    private $crypto_service;
    private $ai_service;

    public function __construct() {
        $this->crypto_service = new Jenny_AI_Chat_Crypto_Service(
            get_option('jenny_ai_chat_coinmarketcap_key')
        );
        $this->ai_service = new Jenny_AI_Chat_AI_Service(
            get_option('jenny_ai_chat_openai_key')
        );
    }

    public function process_message($message) {
        if ($this->is_price_query($message)) {
            return $this->get_crypto_price($message);
        }
        return $this->ai_service->get_response($message);
    }

    private function is_price_query($message) {
        $price_keywords = ['price', 'worth', 'value', 'cost', 'how much'];
        $message_lower = strtolower($message);
        
        foreach ($price_keywords as $keyword) {
            if (strpos($message_lower, $keyword) !== false) {
                return true;
            }
        }
        return false;
    }

    private function get_crypto_price($message) {
        $crypto_symbols = [
            'bitcoin' => 'BTC',
            'ethereum' => 'ETH',
            'dogecoin' => 'DOGE',
            'doge' => 'DOGE',
            'bnb' => 'BNB',
            'cardano' => 'ADA',
            'solana' => 'SOL'
        ];

        $message_lower = strtolower($message);
        foreach ($crypto_symbols as $name => $symbol) {
            if (strpos($message_lower, $name) !== false) {
                $price = $this->crypto_service->get_price($symbol);
                if ($price) {
                    return "The current price of {$symbol} is \${$price}";
                }
            }
        }

        return "I couldn't identify the cryptocurrency you're asking about. Please specify a supported cryptocurrency.";
    }
}