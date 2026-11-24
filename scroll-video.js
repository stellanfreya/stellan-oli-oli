(() => {
  const videoId = 'CRrf3h9vhp8';
  const playerOrigin = 'https://www.youtube-nocookie.com';
  const player = document.createElement('aside');
  player.className = 'scroll-video-player';
  player.setAttribute('aria-label', 'Olivia Rodrigo traitor video player');
  player.setAttribute('aria-hidden', 'true');
  player.innerHTML = `
    <div class="scroll-video-heading">
      <span>Now playing · traitor</span>
      <button class="scroll-video-close" type="button" aria-label="Hide video">×</button>
    </div>
    <iframe title="Olivia Rodrigo · traitor · Official Video" allow="autoplay; encrypted-media; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <div class="scroll-video-controls">
      <span>Official video</span>
      <button class="scroll-video-mute" type="button" aria-label="Unmute video" aria-pressed="false">Unmute</button>
    </div>
  `;
  document.body.append(player);

  const iframe = player.querySelector('iframe');
  const muteButton = player.querySelector('.scroll-video-mute');
  let muted = true;
  let started = false;
  let playerReady = false;
  let visible = false;
  let dismissed = false;
  let scrollFrame = 0;

  const sendCommand = command => {
    if (!playerReady) return;
    iframe.contentWindow.postMessage(JSON.stringify({
      event: 'command',
      func: command,
      args: []
    }), playerOrigin);
  };

  const syncPlayback = () => {
    sendCommand(muted ? 'mute' : 'unMute');
    sendCommand(visible ? 'playVideo' : 'pauseVideo');
  };

  iframe.addEventListener('load', () => {
    if (!started) return;
    playerReady = true;
    syncPlayback();
  });

  const setVisible = nextVisible => {
    if (visible === nextVisible) return;
    visible = nextVisible;
    player.classList.toggle('is-visible', visible);
    player.setAttribute('aria-hidden', String(!visible));

    if (!started && visible) {
      started = true;
      const params = new URLSearchParams({
        autoplay: '1',
        mute: '1',
        controls: '1',
        playsinline: '1',
        rel: '0',
        enablejsapi: '1',
        origin: window.location.origin
      });
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
    } else {
      syncPlayback();
    }
  };

  const updateVisibility = () => {
    scrollFrame = 0;
    setVisible(!dismissed && window.scrollY > Math.max(320, window.innerHeight * 0.45));
  };

  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateVisibility);
  }, { passive: true });

  muteButton.addEventListener('click', () => {
    muted = !muted;
    muteButton.textContent = muted ? 'Unmute' : 'Mute';
    muteButton.setAttribute('aria-label', `${muted ? 'Unmute' : 'Mute'} video`);
    muteButton.setAttribute('aria-pressed', String(!muted));
    syncPlayback();
  });

  player.querySelector('.scroll-video-close').addEventListener('click', () => {
    dismissed = true;
    setVisible(false);
  });

  updateVisibility();
})();
