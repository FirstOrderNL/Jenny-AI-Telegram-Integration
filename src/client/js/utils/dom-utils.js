export const domUtils = {
  scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
  },

  fadeIn(element) {
    element.classList.remove('hidden');
    element.classList.add('fade-in');
  },

  fadeOut(element) {
    element.classList.add('hidden');
    element.classList.remove('fade-in');
  },

  focusInput(element) {
    setTimeout(() => element.focus(), 100);
  }
};