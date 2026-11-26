(() => {
  const player = document.createElement('aside');
  player.className = 'scroll-video-player';
  player.setAttribute('aria-label', 'Olivia Rodrigo traitor video player');
  player.setAttribute('aria-hidden', 'true');
  player.innerHTML = `
    <div class="scroll-video-heading">
      <span>Now playing · traitor</span>
      <button class="scroll-video-close" type="button" aria-label="Hide video">×</button>
    </div>
    <video class="scroll-video" playsinline preload="none" aria-label="Olivia Rodrigo · traitor · Official Video">
      <source src="./assets/traitor.mp4" type="video/mp4">
      Your browser does not support HTML video.
    </video>
    <div class="scroll-video-controls">
      <span>Hosted video · no ads</span>
      <div class="scroll-video-volume">
        <button class="scroll-video-play" type="button" aria-label="Play video">Play</button>
        <button class="scroll-video-mute" type="button" aria-label="Unmute video" aria-pressed="false">Unmute</button>
        <input class="scroll-video-volume-slider" type="range" min="0" max="100" step="5" value="40" aria-label="Video volume">
      </div>
    </div>
  `;
  document.body.append(player);

  const video = player.querySelector('video');
  const playButton = player.querySelector('.scroll-video-play');
  const muteButton = player.querySelector('.scroll-video-mute');
  const volumeSlider = player.querySelector('.scroll-video-volume-slider');
  let muted = true;
  let volume = Number(volumeSlider.value) / 100;
  let visible = false;
  let dismissed = false;
  let scrollFrame = 0;

  const updateMuteButton = () => {
    muteButton.textContent = muted ? 'Unmute' : 'Mute';
    muteButton.setAttribute('aria-label', `${muted ? 'Unmute' : 'Mute'} video`);
    muteButton.setAttribute('aria-pressed', String(!muted));
  };

  const updatePlayButton = () => {
    const playing = !video.paused && !video.ended;
    playButton.textContent = playing ? 'Pause' : 'Play';
    playButton.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} video`);
  };

  const syncPlayback = () => {
    video.muted = muted;
    video.volume = volume;
    if (visible) {
      video.play().catch(() => updatePlayButton());
    } else {
      video.pause();
    }
    updatePlayButton();
  };

  video.addEventListener('play', updatePlayButton);
  video.addEventListener('pause', updatePlayButton);
  video.addEventListener('ended', updatePlayButton);

  const setVisible = nextVisible => {
    if (visible === nextVisible) return;
    visible = nextVisible;
    player.classList.toggle('is-visible', visible);
    player.setAttribute('aria-hidden', String(!visible));

    syncPlayback();
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
      volume = 0.4;
      volumeSlider.value = String(volume * 100);
    }
    muted = !muted;
    updateMuteButton();
    syncPlayback();
  });

  playButton.addEventListener('click', () => {
    if (video.paused || video.ended) {
      video.play().catch(() => updatePlayButton());
    } else {
      video.pause();
    }
    updatePlayButton();
  });

  volumeSlider.addEventListener('input', () => {
    volume = Number(volumeSlider.value) / 100;
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
