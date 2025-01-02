export class SocketHandler {
  constructor(socket, chatUI) {
    this.socket = socket;
    this.chatUI = chatUI;
    this.initializeSocketListeners();
  }

  initializeSocketListeners() {
    this.socket.on('response', (response) => {
      this.chatUI.appendMessage(response);
    });

    this.socket.on('error', (error) => {
      this.chatUI.appendMessage(error.message);
    });
  }

  sendMessage(message) {
    this.socket.emit('message', message);
  }
}