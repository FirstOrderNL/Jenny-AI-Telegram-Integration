import { ChatWidget } from './ui/chat-widget.js';
import { ChatControls } from './ui/chat-controls.js';

export class ChatManager {
    constructor() {
        this.widget = new ChatWidget();
        this.controls = new ChatControls(this.widget);
        
        // Show initial greeting
        this.widget.appendMessage(
            'Hi! I\'m Jenny, your On-Chain reporter. Ask me about crypto prices or the latest blockchain news!'
        );
    }

    static initialize() {
        return new ChatManager();
    }
}