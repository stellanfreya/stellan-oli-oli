(() => {
  if (!('serviceWorker' in navigator)) return;

  const projectScope = new URL('./', window.location.href).href;
  navigator.serviceWorker.getRegistrations()
    .then(registrations => Promise.all(registrations
      .filter(registration => registration.scope === projectScope)
      .map(registration => registration.unregister())))
    .then(() => caches.delete('stellan-oli-oli-shell-v1'))
    .catch(error => console.error('Could not remove the previous browser-app cache.', error));
})();
