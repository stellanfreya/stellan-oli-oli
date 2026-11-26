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
    const caption = document.createElement('p');
    caption.textContent = video.title;
    card.append(frame, caption);
    feed.append(card);
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
