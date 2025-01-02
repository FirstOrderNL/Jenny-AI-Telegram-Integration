export const DOMUtils = {
  scrollToBottom(element) {
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  },

  setDisplay(element, isVisible) {
    if (element) {
      element.style.display = isVisible ? 'block' : 'none';
    }
  },

  focusElement(element) {
    if (element) {
      setTimeout(() => element.focus(), 0);
    }
  }
};