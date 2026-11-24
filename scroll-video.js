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
      <div class="scroll-video-volume">
        <button class="scroll-video-mute" type="button" aria-label="Unmute video" aria-pressed="false">Unmute</button>
        <input class="scroll-video-volume-slider" type="range" min="0" max="100" step="5" value="40" aria-label="Video volume">
      </div>
    </div>
  `;
  document.body.append(player);

  const iframe = player.querySelector('iframe');
  const muteButton = player.querySelector('.scroll-video-mute');
  const volumeSlider = player.querySelector('.scroll-video-volume-slider');
  let muted = true;
  let volume = Number(volumeSlider.value);
  let started = false;
  let playerReady = false;
  let visible = false;
  let dismissed = false;
  let scrollFrame = 0;

  const sendCommand = (command, args = []) => {
    if (!playerReady) return;
    iframe.contentWindow.postMessage(JSON.stringify({
      event: 'command',
      func: command,
      args
    }), playerOrigin);
  };

  const syncPlayback = () => {
    sendCommand('setVolume', [volume]);
    sendCommand(muted ? 'mute' : 'unMute');
    sendCommand(visible ? 'playVideo' : 'pauseVideo');
  };

  const updateMuteButton = () => {
    muteButton.textContent = muted ? 'Unmute' : 'Mute';
    muteButton.setAttribute('aria-label', `${muted ? 'Unmute' : 'Mute'} video`);
    muteButton.setAttribute('aria-pressed', String(!muted));
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
    if (muted && volume === 0) {
      volume = 40;
      volumeSlider.value = String(volume);
    }
    muted = !muted;
    updateMuteButton();
    syncPlayback();
  });

  volumeSlider.addEventListener('input', () => {
    volume = Number(volumeSlider.value);
    muted = volume === 0;
    updateMuteButton();
    syncPlayback();
  });

  player.querySelector('.scroll-video-close').addEventListener('click', () => {
    dismissed = true;
    setVisible(false);
  });

  updateVisibility();
})();
