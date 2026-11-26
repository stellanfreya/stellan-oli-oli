(() => {
  const installButton = document.querySelector('#installAppButton');
  const dialog = document.querySelector('#installAppDialog');
  const closeButton = document.querySelector('#closeInstallAppDialog');
  const status = document.querySelector('#installAppStatus');
  if (!installButton || !dialog || !closeButton || !status) return;

  let deferredPrompt = null;
  const isInstalled = () =>
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  const showGuide = message => {
    status.textContent = message || 'Choose the install option in your browser menu to add the app to Windows.';
    dialog.showModal();
    closeButton.focus();
  };

  const finishInstall = () => {
    installButton.textContent = 'app installed ✓';
    installButton.disabled = true;
    status.textContent = 'Stellan Oli Oli is installed and ready to open from your Windows Start menu.';
  };

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
  });

  window.addEventListener('appinstalled', finishInstall);

  installButton.addEventListener('click', async () => {
    if (isInstalled()) {
      showGuide('Stellan Oli Oli is already installed on this device.');
      return;
    }

    if (!deferredPrompt) {
      showGuide();
      return;
    }

    const prompt = deferredPrompt;
    deferredPrompt = null;
    await prompt.prompt();
    const choice = await prompt.userChoice;
    if (choice.outcome === 'accepted') {
      status.textContent = 'Installing Stellan Oli Oli…';
    }
  });

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });

  if (isInstalled()) finishInstall();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js', { scope: './' })
        .catch(error => {
          console.error('Could not register the Stellan Oli Oli app service worker.', error);
          status.textContent = 'App installation is unavailable right now. Please try again in Edge or Chrome.';
        });
    }, { once: true });
  }
})();
