(() => {
  const nav = document.querySelector('.nav');
  if (!nav || document.querySelector('#siteSearch')) return;

  const trigger = document.createElement('button');
  trigger.className = 'site-search-trigger';
  trigger.type = 'button';
  trigger.setAttribute('aria-label', 'Search this site');
  trigger.setAttribute('aria-keyshortcuts', 'Control+K Meta+K');
  trigger.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 4.2 4.2"></path></svg>';
  nav.append(trigger);

  const dialog = document.createElement('dialog');
  dialog.className = 'site-search';
  dialog.id = 'siteSearch';
  dialog.setAttribute('aria-labelledby', 'siteSearchTitle');
  dialog.innerHTML = `
    <form class="site-search-form" role="search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 4.2 4.2"></path></svg>
      <input class="site-search-input" id="siteSearchInput" type="search" autocomplete="off" placeholder="Search songs, photos, and more" aria-label="Search songs, photos, and more">
      <button class="site-search-close" type="button">Close <kbd>esc</kbd></button>
    </form>
    <p class="site-search-hint" id="siteSearchTitle">Explore the fan space</p>
    <div class="site-search-results" id="siteSearchResults" role="listbox" aria-label="Search results"></div>
    <p class="site-search-empty" id="siteSearchEmpty" hidden>No matches yet. Try a song, album, or city.</p>
  `;
  document.body.append(dialog);

  const input = dialog.querySelector('#siteSearchInput');
  const results = dialog.querySelector('#siteSearchResults');
  const empty = dialog.querySelector('#siteSearchEmpty');
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const entries = [];

  const addEntry = (type, title, detail, target, searchable = '') => {
    if (!target) return;
    entries.push({ type, title: title.trim(), detail: detail.trim(), target, searchText: normalize(`${type} ${title} ${detail} ${searchable}`) });
  };

  const moodFinder = document.querySelector('.mood-finder');
  const gallery = document.querySelector('#photos');
  const community = document.querySelector('#community');
  addEntry('Guide', 'Find a song for your mood', 'Mood finder · pick a feeling', moodFinder);
  addEntry('Collection', 'Olivia Rodrigo photo diary', 'Eight photos · open the full-size viewer', gallery);
  addEntry('Community', 'Fan group chat and direct messages', 'Meet other fans · share GIFs and photos', community);

  document.querySelectorAll('.album-card').forEach(card => {
    const title = card.dataset.album || card.querySelector('.album-meta b')?.textContent || 'Album';
    addEntry('Album', title, card.querySelector('.album-caption')?.textContent || '', card, card.textContent);
  });
  document.querySelectorAll('.song-row').forEach(row => {
    const title = row.querySelector('.song-title')?.textContent || '';
    const detail = row.querySelector('.song-album')?.textContent || '';
    addEntry('Song', title, detail, row);
  });
  document.querySelectorAll('#photos .photo').forEach(photo => {
    const image = photo.querySelector('img');
    const caption = photo.querySelector('figcaption')?.firstChild?.textContent || '';
    addEntry('Photo', caption, 'Photo diary · view image', photo, image?.alt);
  });
  document.querySelectorAll('.event-row').forEach(event => {
    const city = event.querySelector('.event-city')?.textContent || '';
    const date = event.querySelector('.event-date')?.textContent.replace(/\s+/g, ' ') || '';
    const venue = event.querySelector('.event-venue')?.textContent || '';
    addEntry('Live date', city, `${date} · ${venue}`, event, venue);
  });

  const selectEntry = entry => {
    dialog.close();
    entry.target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    entry.target.classList.add('search-targeted');
    window.setTimeout(() => entry.target.classList.remove('search-targeted'), 1600);
  };

  const renderResults = query => {
    const term = normalize(query.trim());
    const matches = term
      ? entries.filter(entry => entry.searchText.includes(term)).slice(0, 8)
      : entries.slice(0, 5);
    results.replaceChildren();
    empty.hidden = matches.length > 0;
    for (const entry of matches) {
      const option = document.createElement('button');
      option.className = 'site-search-result';
      option.type = 'button';
      option.setAttribute('role', 'option');
      const type = document.createElement('span');
      type.className = 'site-search-result-type';
      type.textContent = entry.type;
      const copy = document.createElement('span');
      const title = document.createElement('span');
      title.className = 'site-search-result-title';
      title.textContent = entry.title;
      const detail = document.createElement('small');
      detail.className = 'site-search-result-detail';
      detail.textContent = entry.detail;
      copy.append(title, detail);
      const arrow = document.createElement('span');
      arrow.className = 'site-search-result-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '↗';
      option.append(type, copy, arrow);
      option.addEventListener('click', () => selectEntry(entry));
      results.append(option);
    }
  };

  const openSearch = query => {
    if (!dialog.open) dialog.showModal();
    renderResults(query || '');
    window.setTimeout(() => {
      input.focus();
      if (query) input.select();
    }, 30);
  };

  trigger.addEventListener('click', () => openSearch(''));
  dialog.querySelector('.site-search-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.querySelector('form').addEventListener('submit', event => event.preventDefault());
  input.addEventListener('input', () => renderResults(input.value));
  document.addEventListener('keydown', event => {
    const element = event.target;
    const typing = element instanceof HTMLElement && (element.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(element.tagName));
    if (event.key === 'Escape' && dialog.open) dialog.close();
    if (!typing && (event.key === '/' || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'))) {
      event.preventDefault();
      openSearch('');
    }
  });
  renderResults('');

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motionDisabled = document.documentElement.classList.contains('account-motion-off');
  const photos = [...document.querySelectorAll('.photo img')];
  if (!reduceMotion && !motionDisabled && photos.length) {
    const backdrop = document.createElement('div');
    backdrop.className = 'ambient-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    const backdropImage = document.createElement('img');
    backdropImage.src = photos[0].currentSrc || photos[0].src;
    backdropImage.alt = '';
    backdropImage.decoding = 'async';
    backdrop.append(backdropImage);
    document.body.prepend(backdrop);
  }
  if (reduceMotion || motionDisabled || !photos.length) return;

  const backdrop = document.querySelector('.ambient-backdrop');
  let frame = 0;
  const updatePhotoMotion = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (backdrop) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
        backdrop.style.setProperty('--ambient-scroll-shift', `${((.5 - progress) * 72).toFixed(1)}px`);
      }
      const viewportCenter = window.innerHeight * 0.52;
      for (const image of photos) {
        const bounds = image.getBoundingClientRect();
        if (bounds.bottom < -100 || bounds.top > window.innerHeight + 100) continue;
        const offset = Math.max(-18, Math.min(18, (viewportCenter - (bounds.top + bounds.height / 2)) * 0.025));
        image.style.setProperty('--photo-shift', `${offset.toFixed(1)}px`);
      }
    });
  };
  window.addEventListener('scroll', updatePhotoMotion, { passive: true });
  window.addEventListener('resize', updatePhotoMotion);
  updatePhotoMotion();
})();
