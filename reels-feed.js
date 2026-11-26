(() => {
  const gallery = document.querySelector('#photos');
  if (!gallery) return;

  const videos = [
    { src: './assets/oliclip-iphone-18-pro-max.mp4', title: 'Trying new cases on my iPhone 18 Pro Max!' },
    { src: './assets/oliclip-real-diva.mp4', title: 'Who’s the REAL Diva Here? 😂💜 #stupidsong' },
    { src: './assets/oliclip-bad-idea-right-nashville.mp4', title: 'Olivia Rodrigo performing “bad idea right?” · Nashville Night 2' },
    { src: './assets/oliclip-my-way-nashville.mp4', title: 'Olivia Rodrigo performing “my way” · Nashville Night 2' }
  ];
  const section = document.createElement('section');
  section.className = 'section reels-section oliclips-section';
  section.id = 'oliclips';
  section.setAttribute('aria-labelledby', 'oliclipsTitle');
  section.innerHTML = `
    <div class="section-head">
      <div>
        <div class="label">▶ oliclips · official video feed</div>
        <h2 id="oliclipsTitle">Olivia<br><em>Oliclips.</em></h2>
      </div>
      <div class="section-note">Scroll the feed and play<br>videos right here.</div>
    </div>
    <div class="reels-feed" tabindex="0" aria-label="Scrollable Olivia Rodrigo video feed"></div>
    <p class="reels-credit">Videos are hosted directly on this site; Oliclips has no YouTube embeds.</p>`;
  gallery.after(section);

  const feed = section.querySelector('.reels-feed');
  const previewObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const video = entry.target.querySelector('video');
      video.preload = 'metadata';
      video.load();
      previewObserver.unobserve(entry.target);
    }
  }, { root: feed, rootMargin: '160px 0px' });

  for (const video of videos) {
    const card = document.createElement('article');
    card.className = 'reel-card';
    const frame = document.createElement('video');
    frame.className = 'reel-player';
    frame.controls = true;
    frame.playsInline = true;
    frame.preload = 'none';
    frame.setAttribute('aria-label', video.title);
    const source = document.createElement('source');
    source.src = video.src;
    source.type = 'video/mp4';
    frame.append(source);
    const capturePreview = () => {
      if (!frame.videoWidth || !frame.videoHeight) return;
      const canvas = document.createElement('canvas');
      canvas.width = 360;
      canvas.height = Math.round(360 * frame.videoHeight / frame.videoWidth);
      const context = canvas.getContext('2d');
      if (!context) return;
      context.drawImage(frame, 0, 0, canvas.width, canvas.height);
      frame.poster = canvas.toDataURL('image/jpeg', 0.75);
      if (frame.paused && frame.currentTime > 0) frame.currentTime = 0;
    };
    frame.addEventListener('loadeddata', () => {
      if (!Number.isFinite(frame.duration) || frame.duration <= 0) {
        capturePreview();
        return;
      }
      frame.addEventListener('seeked', capturePreview, { once: true });
      frame.currentTime = Math.min(6, Math.max(1, frame.duration * 0.2));
    }, { once: true });
    const caption = document.createElement('p');
    caption.textContent = video.title;
    card.append(frame, caption);
    feed.append(card);
    previewObserver.observe(card);
  }

  const nav = document.querySelector('.navlinks');
  if (nav && !nav.querySelector('a[href="#oliclips"]')) {
    const link = document.createElement('a');
    link.href = '#oliclips';
    link.className = 'reel-nav-link';
    link.setAttribute('aria-label', 'Open Oliclips');
    link.textContent = '▶ oliclips';
    nav.append(link);
  }

  const shortcut = document.createElement('a');
  shortcut.href = '#oliclips';
  shortcut.className = 'reels-shortcut';
  shortcut.setAttribute('aria-label', 'Jump to Oliclips');
  shortcut.title = 'Oliclips';
  shortcut.textContent = '▶';
  document.body.append(shortcut);
})();
