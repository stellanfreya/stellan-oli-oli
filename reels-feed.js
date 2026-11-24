(() => {
  const gallery = document.querySelector('#photos');
  if (!gallery) return;

  const videos = [
    { id: 'ZmDBbnmKpqQ', title: 'drivers license · Official Video' },
    { id: 'RlPNh_PBZb4', title: 'vampire · Official Video' },
    { id: 'ZsJ-BHohXRI', title: 'get him back! · Official Video' },
    { id: 'QXcjPySjdJU', title: 'obsessed · Official Music Video' },
    { id: 'zla_eLVFiDU', title: 'bad idea right? · Official Lyric Video' }
  ];
  const section = document.createElement('section');
  section.className = 'section reels-section';
  section.id = 'reels';
  section.setAttribute('aria-labelledby', 'reelsTitle');
  section.innerHTML = `
    <div class="section-head">
      <div>
        <div class="label">▶ the official video scroll</div>
        <h2 id="reelsTitle">Keep the<br><em>music moving.</em></h2>
      </div>
      <div class="section-note">Scroll the feed and play<br>official videos right here.</div>
    </div>
    <div class="reels-feed" tabindex="0" aria-label="Scrollable Olivia Rodrigo video feed"></div>
    <p class="reels-credit">Videos are embedded from Olivia Rodrigo’s official YouTube channel. All video rights remain with their owners.</p>`;
  gallery.after(section);

  const feed = section.querySelector('.reels-feed');
  for (const video of videos) {
    const card = document.createElement('article');
    card.className = 'reel-card';
    const frame = document.createElement('iframe');
    frame.className = 'reel-player';
    frame.src = `https://www.youtube-nocookie.com/embed/${video.id}?playsinline=1&rel=0`;
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
  if (nav && !nav.querySelector('a[href="#reels"]')) {
    const link = document.createElement('a');
    link.href = '#reels';
    link.className = 'reel-nav-link';
    link.setAttribute('aria-label', 'Open the video feed');
    link.textContent = '▶ reels';
    nav.append(link);
  }
})();
