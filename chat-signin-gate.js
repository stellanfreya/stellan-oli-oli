(() => {
  const isSignedIn = () => Boolean(window.getCommunityChatContext?.()?.user);
  const openSignIn = () => {
    const modal = document.querySelector('#authModal');
    if (!modal) return;
    modal.classList.add('open');
    const message = document.querySelector('#authMessage');
    if (message) message.textContent = '';
    document.querySelector('#authEmail')?.focus();
  };
  const actionSelector = '#chatInput, #chatSend, #chatAttachButton, #chatGifButton, .chat-people-button, #chatMessages, #chatEmpty, .chat-tools, .chat-compose, #chatGifPicker';

  const enableGuestActions = () => {
    if (isSignedIn()) return;
    document.querySelectorAll('#chatInput, #chatSend, #chatAttachButton, #chatGifButton, .chat-people-button')
      .forEach((control) => {
        if (control.disabled) control.disabled = false;
      });
  };

  const gateInteraction = (event) => {
    if (isSignedIn() || !event.target.closest?.(actionSelector)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openSignIn();
  };

  enableGuestActions();
  document.addEventListener('click', gateInteraction, true);
  document.addEventListener('focusin', (event) => {
    if (!isSignedIn() && event.target.matches?.('#chatInput')) openSignIn();
  }, true);
  document.addEventListener('submit', (event) => {
    if (isSignedIn() || !event.target.matches?.('#chatForm, .chat-dm-form')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    openSignIn();
  }, true);

  new MutationObserver(enableGuestActions).observe(document.body, {
    attributes: true,
    attributeFilter: ['disabled'],
    childList: true,
    subtree: true
  });
})();
