(() => {
  const gallery = document.querySelector('#photos');
  if (!gallery) return;

  const videos = [
    { playlistId: 'UUxE5jEls-T0QtlTHT8lI1lw', title: 'All official channel uploads' },
    { id: 'ZmDBbnmKpqQ', title: 'drivers license · Official Video' },
    { id: 'RlPNh_PBZb4', title: 'vampire · Official Video' },
    { id: 'ZsJ-BHohXRI', title: 'get him back! · Official Video' },
    { id: 'QXcjPySjdJU', title: 'obsessed · Official Music Video' },
    { id: 'zla_eLVFiDU', title: 'bad idea right? · Official Lyric Video' }
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
      <div class="section-note">Scroll the feed and play<br>official videos right here.</div>
    </div>
    <div class="reels-feed" tabindex="0" aria-label="Scrollable Olivia Rodrigo video feed"></div>
    <p class="reels-credit">Official videos are embedded from YouTube and remain hosted by their rights holders.</p>
    <a class="pill oliclips-more" href="https://www.youtube.com/@OliviaRodrigoVEVO/shorts" target="_blank" rel="noopener noreferrer">browse official shorts ↗</a>`;
  gallery.after(section);

  const feed = section.querySelector('.reels-feed');
  for (const video of videos) {
    const card = document.createElement('article');
    card.className = 'reel-card';
    const frame = document.createElement('iframe');
    frame.className = 'reel-player';
    frame.src = video.playlistId
      ? `https://www.youtube-nocookie.com/embed/videoseries?list=${video.playlistId}&playsinline=1&rel=0`
      : `https://www.youtube-nocookie.com/embed/${video.id}?playsinline=1&rel=0`;
    frame.title = `Olivia Rodrigo · ${video.title}`;
    frame.loading = 'lazy';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen = true;
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
