import { createClient } from '@supabase/supabase-js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const pageHost = $('#pageHost');
const appStatus = $('#appStatus');
const appApi = window.stellanApp;

const songs = [
  { id: 'drivers-license', title: 'drivers license', era: 'SOUR' },
  { id: 'deja-vu', title: 'deja vu', era: 'SOUR' },
  { id: 'good-4-u', title: 'good 4 u', era: 'SOUR' },
  { id: 'traitor', title: 'traitor', era: 'SOUR' },
  { id: 'brutal', title: 'brutal', era: 'SOUR' },
  { id: 'vampire', title: 'vampire', era: 'GUTS' },
  { id: 'bad-idea-right', title: 'bad idea right?', era: 'GUTS' },
  { id: 'get-him-back', title: 'get him back!', era: 'GUTS' },
  { id: 'making-the-bed', title: 'making the bed', era: 'GUTS' },
  { id: 'obsessed', title: 'obsessed', era: 'GUTS (spilled)' },
  { id: 'drop-dead', title: 'drop dead', era: 'you seem pretty sad...' },
  { id: 'the-cure', title: 'the cure', era: 'you seem pretty sad...' },
  { id: 'cigarette-smoke', title: 'cigarette smoke', era: 'you seem pretty sad...' }
];

const eraDetails = {
  SOUR: { className: 'sour', tag: 'THE DEBUT', blurb: 'A lavender scrapbook for the first songs that made a whole generation feel seen.' },
  GUTS: { className: 'guts', tag: 'THE SECOND ERA', blurb: 'Big feelings, louder guitars, and the courage to let the messy parts show.' },
  'GUTS (spilled)': { className: 'spilled', tag: 'THE AFTERGLOW', blurb: 'A little extra bite for the songs that kept unfolding after the album.' },
  'you seem pretty sad...': { className: 'future', tag: 'THE LATEST CHAPTER', blurb: 'The newest songs in the fan-site catalogue, gathered in their own little corner.' }
};

const clips = [
  { src: 'oliclip-iphone-18-pro-max.mp4', title: 'Trying new cases on my iPhone 18 Pro Max!' },
  { src: 'oliclip-real-diva.mp4', title: 'Who’s the REAL Diva Here? #stupidsong' },
  { src: 'oliclip-bad-idea-right-nashville.mp4', title: '“bad idea right?” · Nashville Night 2' },
  { src: 'oliclip-my-way-nashville.mp4', title: '“my way” · Nashville Night 2' }
];

const photos = [
  { src: 'olivia-live-o2-01-web.jpg', caption: 'guts world tour · london, 2024', alt: 'Olivia Rodrigo performing with her band at the O2 Arena in London', credit: 'https://commons.wikimedia.org/wiki/File:OlivaRO2150524_(1)_(53726273752).jpg' },
  { src: 'olivia-live-o2-14-web.jpg', caption: 'a quieter verse · london, 2024', alt: 'Olivia Rodrigo singing on stage in London', credit: 'https://commons.wikimedia.org/wiki/File:OlivaRO2150524_(14)_(53727393053)_(cropped).jpg' },
  { src: 'olivia-live-o2-16.jpg', caption: 'lights up · london, 2024', alt: 'Olivia Rodrigo performing beneath concert lights', credit: 'https://commons.wikimedia.org/wiki/File:OlivaRO2150524_(16)_(53726273507).jpg' },
  { src: 'olivia-live-o2-23.jpg', caption: 'the bridge · london, 2024', alt: 'Olivia Rodrigo singing into a microphone at the O2 Arena', credit: 'https://commons.wikimedia.org/wiki/File:OlivaRO2150524_(23)_(53726273467).jpg' },
  { src: 'olivia-glastonbury-2025.jpg', caption: 'glastonbury · summer, 2025', alt: 'Olivia Rodrigo performing at Glastonbury Festival in 2025', credit: 'https://commons.wikimedia.org/wiki/File:Glasto2025-546_(cropped_2).jpg' }
];
const dashboardPhoto = {
  src: 'olivia-rodrigo-o2-london-2024.jpg',
  alt: 'Olivia Rodrigo performing at The O2 in London in May 2024',
  caption: 'the o2 · london · may 2024',
  attribution: 'Photo by Raph_PH · CC BY 2.0 · framed crop',
  credit: 'https://commons.wikimedia.org/wiki/File:OlivaRO2150524_(8)_(53727178201)_(cropped).jpg'
};

const tourDates = [
  { date: 'NOV 12 · 2026', city: 'Atlanta, GA', venue: 'State Farm Arena' },
  { date: 'NOV 15 · 2026', city: 'Orlando, FL', venue: 'Kia Center' },
  { date: 'NOV 19 · 2026', city: 'Sunrise, FL', venue: 'Amerant Bank Arena' },
  { date: 'NOV 23 · 2026', city: 'Nashville, TN', venue: 'Bridgestone Arena' },
  { date: 'DEC 01 · 2026', city: 'Vancouver, BC', venue: 'Rogers Arena' }
];
const ticketUrl = 'https://www.ticketmaster.com/olivia-rodrigo-tickets/artist/2836194';
const tourSourceUrl = 'https://news.livenationentertainment.com/news/olivia-rodrigo-announces-the-unraveled-tour-spanning-60-dates-across-north-america-europe-and-the-uk';
const holidays = [
  { name: 'Halloween', month: 9, day: 31, note: 'A little spooky, a lot of sparkle.' },
  { name: 'Christmas', month: 11, day: 25, note: 'The coziest countdown of the year.' },
  { name: 'New Year', month: 0, day: 1, note: 'New year, new memories to soundtrack.' }
];
const moodSongs = {
  electric: ['good-4-u', 'brutal', 'bad-idea-right'],
  tender: ['traitor', 'drivers-license', 'making-the-bed'],
  chaotic: ['brutal', 'get-him-back', 'obsessed'],
  dreamy: ['deja-vu', 'vampire', 'the-cure']
};
const quizQuestions = [
  { prompt: 'Pick the scene that feels most like you.', answers: [['SOUR', 'A late-night drive with the windows down.'], ['GUTS', 'A loud room and a louder chorus.'], ['GUTS (spilled)', 'The afterparty when the night gets weird.'], ['you seem pretty sad...', 'A quiet moment with a brand-new favorite.']] },
  { prompt: 'Your ideal outfit has…', answers: [['SOUR', 'Lavender, stickers, and a little nostalgia.'], ['GUTS', 'A leather jacket and a don’t-care attitude.'], ['GUTS (spilled)', 'A glittery detail nobody else noticed.'], ['you seem pretty sad...', 'One unexpected piece that starts a conversation.']] },
  { prompt: 'Choose a soundtrack feeling.', answers: [['SOUR', 'Tender and completely honest.'], ['GUTS', 'Fearless, messy, and alive.'], ['GUTS (spilled)', 'A plot twist right before the credits.'], ['you seem pretty sad...', 'Curious about what comes next.']] },
  { prompt: 'What do your friends count on you for?', answers: [['SOUR', 'Remembering every little detail.'], ['GUTS', 'Saying the thing everyone else is thinking.'], ['GUTS (spilled)', 'Making a normal night unforgettable.'], ['you seem pretty sad...', 'Finding a new favorite before everyone else.']] }
];

const pageNames = {
  home: 'YOUR FAN DESK',
  eras: 'THE ALBUM ERAS',
  discovery: 'MOOD & ERA QUIZ',
  oliclips: 'OLICLIPS',
  gallery: 'THE PHOTO DIARY',
  tour: 'LIVE DATES',
  music: 'YOUR LIBRARY',
  community: 'THE FAN CIRCLE',
  messages: 'PRIVATE MESSAGES',
  profile: 'YOUR PROFILE',
  settings: 'APP SETTINGS'
};

const moodCaptions = {
  electric: 'For the scream-sing chorus kind of day.',
  tender: 'Hold the soft parts close. They matter too.',
  chaotic: 'A little unhinged, a lot unforgettable.',
  dreamy: 'Let the lyrics take the long way home.'
};

let currentPage = 'home';
let activeEra = 'SOUR';
let discoveryMood = 'dreamy';
let quizAnswers = [];
let authMode = 'signin';
let currentUser = null;
let profile = null;
let directory = [];
let presence = new Map();
let currentMode = 'online';
let selectedPeer = null;
let pendingGroupFile = null;
let pendingDmFile = null;
let pendingGroupGif = null;
let pendingDmGif = null;
const gifChoices = new Map();
let favorites = new Set();
let playlists = [];
let playlistTracks = new Map();
let activePlaylistId = null;
let fanState = { mood: 'dreamy', notes: [], theme: 'dark', motion: true };
let supabase = null;
let realtimeChannel = null;
let presenceTimer = null;
let scrollRevealObserver = null;
let searchItems = [];

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function safeAvatar(value) {
  return typeof value === 'string' && /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(value)
    ? value
    : '';
}

function displayName() {
  return profile?.display_name
    || currentUser?.user_metadata?.display_name
    || currentUser?.email?.split('@')[0]
    || '';
}

function setStatus(message) {
  appStatus.textContent = message || '';
}

function setInlineStatus(message, selector = '#pageStatus') {
  const node = $(selector);
  if (node) node.textContent = message || '';
}

function dateLabel(value) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed)
    ? 'Saved on this computer'
    : new Date(parsed).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function timeLabel(value) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed)
    ? ''
    : new Date(parsed).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

function avatarMarkup(value, name, className = 'chat-avatar') {
  const avatar = safeAvatar(value);
  return avatar
    ? `<span class="${className}"><img src="${avatar}" alt=""></span>`
    : `<span class="${className}">${escapeHtml((name || 'F').slice(0, 1).toUpperCase())}</span>`;
}

const attachmentUrlCache = new Map();
const imageAttachmentTypes = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp']);

async function attachmentMarkup(path, name, type) {
  if (!path) return '';
  const safeName = escapeHtml(name || 'Download attachment');
  const extension = (name || path).split(/[?#]/, 1)[0].split('.').pop()?.toLowerCase();
  const mediaType = imageAttachmentTypes.has(type) || type === 'video/mp4'
    ? type
    : (!type || type === 'application/octet-stream')
      ? ({ jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif', webp: 'image/webp', mp4: 'video/mp4' })[extension]
      : null;
  const isImage = imageAttachmentTypes.has(mediaType);
  if (!isImage && mediaType !== 'video/mp4') {
    return `<button class="attachment-link" type="button" data-open-attachment="${escapeHtml(path)}">↧ ${safeName}</button>`;
  }
  try {
    let cached = attachmentUrlCache.get(path);
    if (!cached || cached.expiresAt <= Date.now() + 30_000) {
      const { data, error } = await supabase.storage.from('community-chat-files').createSignedUrl(path, 3600);
      if (error) throw error;
      cached = { url: data.signedUrl, expiresAt: Date.now() + 3600_000 };
      attachmentUrlCache.set(path, cached);
    }
    const url = escapeHtml(cached.url);
    return isImage
      ? `<figure class="chat-media-attachment"><img src="${url}" alt="${safeName}" loading="lazy"><figcaption>${safeName}</figcaption></figure>`
      : `<figure class="chat-media-attachment"><video src="${url}" controls preload="metadata" playsinline></video><figcaption>${safeName}</figcaption></figure>`;
  } catch (error) {
    return `<button class="attachment-link" type="button" data-open-attachment="${escapeHtml(path)}">↧ ${safeName}</button><p class="attachment-error">Preview unavailable: ${escapeHtml(error.message)}</p>`;
  }
}

function isGiphyUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && (url.hostname === 'giphy.com' || url.hostname.endsWith('.giphy.com'));
  } catch {
    return false;
  }
}

function gifMarkup(url) {
  return isGiphyUrl(url)
    ? `<figure class="chat-gif-attachment"><img src="${escapeHtml(url)}" alt="GIF shared from GIPHY" loading="lazy"><figcaption>Powered by GIPHY</figcaption></figure>`
    : '';
}

function renderGifPicker(scope, disabled = false) {
  const label = scope === 'dm' ? 'private message' : 'fan chat';
  return `<section class="chat-gif-picker" id="${scope}GifPicker" aria-label="GIPHY search" hidden>
    <form class="chat-gif-search-form" data-gif-search-form="${scope}">
      <label class="sr-only" for="${scope}GifQuery">Search GIPHY for a GIF to send in your ${label}</label>
      <div class="chat-gif-search"><input id="${scope}GifQuery" type="search" maxlength="50" placeholder="Search GIPHY…" required ${disabled ? 'disabled' : ''}><button class="button button-quiet button-small" type="submit" ${disabled ? 'disabled' : ''}>Search GIFs</button></div>
    </form>
    <p class="chat-gif-status" id="${scope}GifStatus" role="status" aria-live="polite"></p>
    <div class="chat-gif-results" id="${scope}GifResults"></div>
    <p class="chat-gif-attribution">Powered by <a href="https://giphy.com" target="_blank" rel="noopener noreferrer">GIPHY</a></p>
  </section>
  <div class="chat-gif-selection" id="${scope}GifSelection" hidden></div>`;
}

function updateGifSelection(scope, gif) {
  const selection = $(`#${scope}GifSelection`);
  if (!selection) return;
  selection.hidden = !gif;
  selection.innerHTML = gif
    ? `<img src="${escapeHtml(gif.previewUrl || gif.url)}" alt=""><span>GIF ready: ${escapeHtml(gif.title)}</span><button class="clip-muted" type="button" data-clear-gif="${scope}">Remove</button>`
    : '';
}

async function searchGifs(scope) {
  const query = $(`#${scope}GifQuery`)?.value.trim();
  const results = $(`#${scope}GifResults`);
  const status = $(`#${scope}GifStatus`);
  if (!query || !results || !status) return;
  const apiKey = window.ORACLE_GIPHY_API_KEY;
  if (!apiKey) {
    status.textContent = 'GIPHY search is not configured.';
    return;
  }
  status.textContent = 'Searching GIPHY…';
  results.replaceChildren();
  try {
    const params = new URLSearchParams({ api_key: apiKey, q: query, limit: '18', rating: 'g', lang: 'en' });
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?${params}`);
    if (!response.ok) throw new Error(`GIPHY search failed (${response.status}).`);
    const result = await response.json();
    gifChoices.clear();
    const buttons = (result.data || []).flatMap(gif => {
      const url = gif.images?.fixed_height?.url;
      const previewUrl = gif.images?.fixed_width_small?.url || url;
      if (!gif.id || !isGiphyUrl(url) || !isGiphyUrl(previewUrl)) return [];
      const choice = { id: gif.id, url, previewUrl, title: gif.title || 'GIPHY GIF' };
      gifChoices.set(choice.id, choice);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'chat-gif-result';
      button.dataset.selectGif = choice.id;
      button.setAttribute('aria-label', `Select ${choice.title}`);
      const image = document.createElement('img');
      image.src = previewUrl;
      image.alt = choice.title;
      image.loading = 'lazy';
      button.append(image);
      return [button];
    });
    results.replaceChildren(...buttons);
    status.textContent = buttons.length ? 'Choose a GIF to add it to your message.' : 'No GIFs found.';
  } catch (error) {
    status.textContent = error.message || 'Could not search GIPHY.';
  }
}

function applyAppearance() {
  document.documentElement.dataset.theme = fanState.theme;
  document.documentElement.dataset.motion = fanState.motion ? 'on' : 'off';
}

function updateIdentity() {
  const name = displayName();
  const avatar = safeAvatar(profile?.avatar_url);
  $('#sidebarName').textContent = name || 'Your fan space';
  $('#sidebarStatus').textContent = currentUser ? 'Your account is connected' : 'Sign in to sync';
  for (const selector of ['#sidebarAvatar', '#topAvatar']) {
    const node = $(selector);
    node.replaceChildren();
    if (avatar) {
      const image = document.createElement('img');
      image.src = avatar;
      image.alt = '';
      node.append(image);
    } else {
      node.textContent = name ? name.slice(0, 1).toUpperCase() : 'S';
    }
  }
}

function renderNoteCards(notes, limit = 3) {
  if (!notes.length) {
    return '<div class="empty-state"><span>✳</span><p>Your first little memory goes here.<br>Only you can see these notes.</p></div>';
  }
  return notes.slice(0, limit).map(note => `
    <article class="note-card">
      <p>${escapeHtml(note.text)}</p>
      <time>${escapeHtml(dateLabel(note.createdAt))}</time>
      <button class="delete-note" type="button" data-delete-note="${escapeHtml(note.id)}" aria-label="Delete this private note">×</button>
    </article>`).join('');
}

function renderMoodOptions() {
  return `<div class="mood-options" role="group" aria-label="Choose today’s mood">
    <button class="mood-option" type="button" data-mood="electric" aria-pressed="${fanState.mood === 'electric'}"><span>⚡</span> electric</button>
    <button class="mood-option" type="button" data-mood="tender" aria-pressed="${fanState.mood === 'tender'}"><span>♡</span> tender</button>
    <button class="mood-option" type="button" data-mood="chaotic" aria-pressed="${fanState.mood === 'chaotic'}"><span>✳</span> chaotic</button>
    <button class="mood-option" type="button" data-mood="dreamy" aria-pressed="${fanState.mood === 'dreamy'}"><span>☾</span> dreamy</button>
  </div><p class="mood-caption" id="moodCaption">${moodCaptions[fanState.mood] || moodCaptions.dreamy}</p>`;
}

function renderHome() {
  const greeting = currentUser ? `Welcome back, ${escapeHtml(displayName())}.` : 'A little home for every feeling.';
  return `<section class="page-enter">
    <section class="home-hero" aria-labelledby="welcomeTitle">
      <div class="hero-copy">
        <p class="eyebrow"><span>✳</span> YOUR FAN DESK · YOUR SPACE</p>
        <h1 id="welcomeTitle">${greeting}<br><em>Stay in the feeling.</em></h1>
        <p>Your own little desktop world for the songs, moments, and people that make the fan experience yours.</p>
        <div class="hero-actions">
          <button class="button button-primary" type="button" data-page="oliclips">Watch Oliclips <span>↗</span></button>
            <button class="button button-quiet" type="button" data-page="discovery">Find your mood <span>→</span></button>
        </div>
      </div>
      <figure class="home-hero-photo">
        <img src="../images/${escapeHtml(dashboardPhoto.src)}" alt="${escapeHtml(dashboardPhoto.alt)}">
        <figcaption><span>${escapeHtml(dashboardPhoto.caption)}</span><small>${escapeHtml(dashboardPhoto.attribution)}</small><button class="home-hero-source" type="button" data-external="${escapeHtml(dashboardPhoto.credit)}">PHOTO & LICENSE ↗</button></figcaption>
      </figure>
      <div class="hero-era-sticker" aria-hidden="true">A WHOLE LOT OF<br><strong>FEELINGS</strong><br>✦ FOR THE FANS</div>
      <div class="hero-foot">THE DESKTOP EDITION · SIDE A</div>
    </section>

    <section class="home-grid" aria-label="Your personal fan desk">
      <article class="panel mood-panel">
        <div class="panel-title"><div><p class="panel-label">CHECKING IN</p><h2>What’s your mood?</h2></div><span class="pill-stamp">TODAY<br>ONLY</span></div>
        <p class="panel-copy">Pick the feeling you’re bringing to the soundtrack today.</p>
        ${renderMoodOptions()}
      </article>
      <article class="panel journal-panel">
        <div class="panel-title"><div><p class="panel-label">PRIVATE FAN JOURNAL</p><h2>Save the feeling.</h2></div><span class="pill-stamp">JUST<br>FOR YOU</span></div>
        <form id="noteForm">
          <label class="sr-only" for="noteInput">Write a private note</label>
          <textarea class="field text-input" id="noteInput" maxlength="600" placeholder="A lyric, a memory, a thought you want to keep…"></textarea>
          <div class="journal-tools"><small id="noteCount">0 / 600</small><button class="button button-primary button-small" id="saveNoteButton" type="submit">Save note ↗</button></div>
        </form>
        <p class="local-only">🔒 Your notes stay on this computer. They aren’t uploaded.</p>
        <p class="form-status" id="noteStatus" role="status" aria-live="polite"></p>
      </article>
    </section>

    <section class="home-section" aria-labelledby="eraPreviewTitle">
      <div class="section-heading"><div><p class="panel-label">PICK YOUR POISON</p><h2 id="eraPreviewTitle">A record for every era</h2></div><button class="button button-quiet button-small" type="button" data-page="eras">All album eras ↗</button></div>
      <div class="era-preview-grid">${Object.entries(eraDetails).map(([name, details]) => `
        <button class="era-card era-card-${details.className}" type="button" data-era="${escapeHtml(name)}">
          <span>${escapeHtml(details.tag)}</span><strong>${escapeHtml(name)}</strong><small>${songs.filter(song => song.era === name).length} tracks · explore this chapter ↗</small>
        </button>`).join('')}</div>
    </section>

    <section class="home-section" aria-label="Shortcuts">
      <div class="section-heading"><div><p class="panel-label">YOUR FRONT-ROW SHORTCUTS</p><h2>Jump back in</h2></div></div>
      <div class="home-quick-grid">
        <button class="quick-card" type="button" data-page="gallery"><span>▧</span><strong>Photo diary</strong><small>Little moments, pinned up</small></button>
        <button class="quick-card" type="button" data-page="discovery"><span>✧</span><strong>Mood & era quiz</strong><small>Find a song for right now</small></button>
        <button class="quick-card" type="button" data-page="music"><span>♫</span><strong>Your library</strong><small>Favorites & playlists</small></button>
        <button class="quick-card" type="button" data-page="community"><span>✳</span><strong>Fan circle</strong><small>Find your people</small></button>
        <button class="quick-card" type="button" data-page="tour"><span>✦</span><strong>Live dates</strong><small>Keep an eye on the stage</small></button>
      </div>
    </section>

    <section class="home-section">
      <div class="section-heading"><div><p class="panel-label">LITTLE THINGS WORTH KEEPING</p><h2>Your saved notes</h2></div><span class="panel-label">${fanState.notes.length} / 30 NOTES</span></div>
      <div class="notes-grid">${renderNoteCards(fanState.notes)}</div>
    </section>
  </section>`;
}

function renderTrack(song, index, playlistId = null) {
  const isFavorite = favorites.has(song.id);
  const playlistOptions = playlists.map(playlist =>
    `<option value="${escapeHtml(playlist.id)}">${escapeHtml(playlist.name)}</option>`
  ).join('');
  return `<article class="track-row">
    <span class="track-number">${String(index + 1).padStart(2, '0')}</span>
    <span class="track-copy"><strong>${escapeHtml(song.title)}</strong><small>${escapeHtml(song.era)}</small></span>
    <span class="track-actions">
      <button class="icon-button ${isFavorite ? 'is-favorite' : ''}" type="button" data-favorite="${escapeHtml(song.id)}" aria-label="${isFavorite ? 'Remove' : 'Save'} ${escapeHtml(song.title)} ${isFavorite ? 'from' : 'to'} favorites">${isFavorite ? '♥' : '♡'}</button>
      ${currentUser && playlists.length ? `<select data-playlist-for="${escapeHtml(song.id)}" aria-label="Add ${escapeHtml(song.title)} to a playlist"><option value="">＋ playlist</option>${playlistOptions}</select>` : ''}
      ${playlistId ? `<button class="icon-button" type="button" data-remove-track="${escapeHtml(playlistId)}:${escapeHtml(song.id)}" aria-label="Remove ${escapeHtml(song.title)} from this playlist">−</button>` : ''}
    </span>
  </article>`;
}

function renderEras() {
  const details = eraDetails[activeEra] || eraDetails.SOUR;
  const eraSongs = songs.filter(song => song.era === activeEra);
  return `<section class="page-enter">
    <header class="page-heading"><div><p class="page-kicker">VINYL SIDE A · THE RECORDS THAT RAISED US</p><h1>Choose your <em>era.</em></h1></div><p class="page-heading-note">Each record has its own little universe.<br>Pick one and stay awhile.</p></header>
    <div class="era-tabs" role="tablist" aria-label="Choose an album era">${Object.keys(eraDetails).map(name => `<button class="era-tab ${name === activeEra ? 'active' : ''}" type="button" data-era="${escapeHtml(name)}" role="tab" aria-selected="${name === activeEra}">${escapeHtml(name)}</button>`).join('')}</div>
    <section class="era-feature era-card-${details.className}">
      <div><p class="page-kicker">${escapeHtml(details.tag)}</p><h2>${escapeHtml(activeEra)}</h2><p>${escapeHtml(details.blurb)}</p></div>
      <div class="vinyl" aria-label="${escapeHtml(activeEra)} record illustration"><span class="vinyl-label">STELLAN<br>OLI OLI</span></div>
    </section>
    <section class="panel"><div class="panel-title"><div><p class="panel-label">SONGBOOK · ${eraSongs.length} TRACKS</p><h2>Pick a song to keep close.</h2></div><span class="pill-stamp">SIDE<br>A</span></div>
      <div class="track-list">${eraSongs.map((song, index) => renderTrack(song, index)).join('')}</div>
    </section>
  </section>`;
}

function renderDiscovery() {
  const recommendations = songs.filter(song => moodSongs[discoveryMood]?.includes(song.id));
  const complete = quizAnswers.length === quizQuestions.length;
  const scores = new Map(Object.keys(eraDetails).map(era => [era, 0]));
  quizAnswers.forEach(era => scores.set(era, (scores.get(era) || 0) + 1));
  const quizResult = complete
    ? [...scores.entries()].sort((first, second) => second[1] - first[1])[0][0]
    : null;
  return `<section class="page-enter">
    <header class="page-heading"><div><p class="page-kicker">A LITTLE SELF-DISCOVERY, SET TO MUSIC</p><h1>Find your <em>feeling.</em></h1></div><p class="page-heading-note">A soundtrack match and a tiny era quiz.<br>Just for fun, no wrong answers.</p></header>
    <section class="panel discovery-mood">
      <div class="panel-title"><div><p class="panel-label">THE MOOD MATCHER</p><h2>What kind of day is it?</h2></div><span class="pill-stamp">SIDE<br>QUEST</span></div>
      <p class="panel-copy">Pick a feeling and get a few songs from the fan-site catalogue to start your queue.</p>
      <div class="mood-options">${Object.keys(moodCaptions).map(mood => `<button class="mood-option" type="button" data-discovery-mood="${mood}" aria-pressed="${discoveryMood === mood}">${mood}</button>`).join('')}</div>
      <div class="track-list discovery-tracks">${recommendations.map(renderTrack).join('')}</div>
    </section>
    <section class="panel quiz-panel">
      <div class="section-heading"><div><p class="panel-label">THE OLIVIA-ERA QUIZ</p><h2>Which chapter feels like you?</h2></div><button class="button button-quiet button-small" type="button" data-quiz-reset>Start over ↺</button></div>
      ${quizQuestions.map((question, index) => `<fieldset class="quiz-question"><legend><span>${String(index + 1).padStart(2, '0')}</span>${escapeHtml(question.prompt)}</legend><div class="quiz-answers">${question.answers.map(([era, answer]) => `<button class="quiz-answer ${quizAnswers[index] === era ? 'selected' : ''}" type="button" data-quiz-question="${index}" data-quiz-era="${escapeHtml(era)}">${escapeHtml(answer)}</button>`).join('')}</div></fieldset>`).join('')}
      ${quizResult ? `<div class="quiz-result"><p class="panel-label">YOUR RESULT</p><h3>${escapeHtml(quizResult)}</h3><p>${escapeHtml(eraDetails[quizResult].blurb)}</p><button class="button button-primary button-small" type="button" data-era="${escapeHtml(quizResult)}">Explore your era ↗</button></div>` : `<p class="panel-copy">${quizAnswers.length} / ${quizQuestions.length} answers picked. Finish the quiz to reveal your era.</p>`}
    </section>
  </section>`;
}

function renderMusic() {
  const favoriteSongs = songs.filter(song => favorites.has(song.id));
  const activePlaylist = playlists.find(playlist => playlist.id === activePlaylistId);
  const activeTracks = activePlaylist
    ? songs.filter(song => (playlistTracks.get(activePlaylist.id) || []).includes(song.id))
    : [];
  return `<section class="page-enter">
    <header class="page-heading"><div><p class="page-kicker">YOUR ACCOUNT · YOUR COLLECTION</p><h1>Your music <em>corner.</em></h1></div><p class="page-heading-note">${currentUser ? 'Your favorites and playlists sync with your fan-site account.' : 'Sign in to keep your favorites and playlists with you.'}</p></header>
    ${currentUser ? `<div class="library-layout">
      <div class="panel"><div class="panel-title"><div><p class="panel-label">ALL THE SONGS</p><h2>Pick a favorite.</h2></div><span class="pill-stamp">${songs.length}<br>TRACKS</span></div>
        <div class="track-list">${songs.map(renderTrack).join('')}</div>
      </div>
      <aside class="panel">
        <p class="panel-label">YOUR LITTLE STACK</p><h2>Playlists</h2>
        <div class="playlist-stack">${playlists.length ? playlists.map(playlist => `<article class="playlist-card"><span class="playlist-cover">♫</span><span class="playlist-copy"><strong>${escapeHtml(playlist.name)}</strong><small>${(playlistTracks.get(playlist.id) || []).length} tracks</small></span><span class="playlist-card-actions"><button class="button button-quiet button-small" type="button" data-view-playlist="${escapeHtml(playlist.id)}">Open</button><button class="icon-button" type="button" data-delete-playlist="${escapeHtml(playlist.id)}" aria-label="Delete ${escapeHtml(playlist.name)}">×</button></span></article>`).join('') : '<div class="empty-state"><span>♫</span><p>Your first playlist is waiting.</p></div>'}</div>
        <form class="playlist-form" id="playlistForm"><label class="sr-only" for="playlistName">Playlist name</label><input class="text-input" id="playlistName" maxlength="60" placeholder="Name a playlist…" required><button class="button button-primary button-small" type="submit" aria-label="Create playlist">＋</button></form>
        <p class="form-status" id="playlistStatus" role="status"></p>
        <div class="home-section"><p class="panel-label">YOUR FAVORITES · ${favoriteSongs.length}</p><div class="favorite-chips">${favoriteSongs.length ? favoriteSongs.map(song => `<span class="favorite-chip">♥ ${escapeHtml(song.title)}</span>`).join('') : '<span class="panel-copy">Tap a heart beside any song to save it here.</span>'}</div></div>
      </aside>
    </div>${activePlaylist ? `<section class="panel home-section"><div class="section-heading"><div><p class="panel-label">YOUR PLAYLIST</p><h2>${escapeHtml(activePlaylist.name)}</h2></div><button class="button button-quiet button-small" type="button" data-close-playlist>Close ×</button></div><div class="track-list">${activeTracks.length ? activeTracks.map((song, index) => renderTrack(song, index, activePlaylist.id)).join('') : '<div class="empty-state"><span>♫</span><p>This playlist is empty. Add songs from the full song list.</p></div>'}</div></section>` : ''}` : renderAuthGate('Sign in to sync your library', 'Your favorites and playlists are part of your fan-site account, so the same collection follows you here.')}
  </section>`;
}

function renderOliclips() {
  return `<section class="page-enter">
    <header class="page-heading"><div><p class="page-kicker">DIRECT FROM THE LOCAL COLLECTION</p><h1>Olivia <em>Oliclips.</em></h1></div><p class="page-heading-note">A little scrollable cinema.<br>Muted by default, yours to turn up.</p></header>
    <div class="clip-grid">${clips.map((clip, index) => `
      <article class="clip-card">
        <div class="clip-frame"><video controls playsinline preload="metadata" muted aria-label="${escapeHtml(clip.title)}"><source src="../assets/${escapeHtml(clip.src)}" type="video/mp4">Your video player does not support this clip.</video></div>
        <div class="clip-caption"><span><strong>${escapeHtml(clip.title)}</strong><br><small>OLICLIPS · ${String(index + 1).padStart(2, '0')}</small></span><button class="clip-muted" type="button" data-toggle-video="${index}" aria-pressed="true">Muted ♫</button></div>
      </article>`).join('')}</div>
    <p class="clip-note">These clips play from the app’s local media collection. Nothing is embedded from YouTube.</p>
  </section>`;
}

function renderGallery() {
  return `<section class="page-enter">
    <header class="page-heading"><div><p class="page-kicker">A LITTLE PAPER TRAIL</p><h1>The photo <em>diary.</em></h1></div><p class="page-heading-note">Pinned-up moments from the front row.<br>Tap a credit for its source.</p></header>
    <div class="photo-grid">${photos.map((photo, index) => `
      <figure class="polaroid" data-open-photo="${index}" tabindex="0" role="button" aria-label="View ${escapeHtml(photo.caption)}">
        <img src="../images/${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt)}" loading="lazy">
        <figcaption><span>${escapeHtml(photo.caption)}</span><button type="button" data-external="${escapeHtml(photo.credit)}" aria-label="View photo source">SOURCE ↗</button></figcaption>
      </figure>`).join('')}</div>
    <p class="gallery-credit">Concert photo sources and license details are credited on Wikimedia Commons. Images remain unchanged from the local fan-site photo collection.</p>
    <dialog class="photo-viewer" id="photoViewer" aria-label="Photo viewer">
      <button class="photo-viewer-close" type="button" data-close-photo aria-label="Close photo viewer">×</button>
      <img id="photoViewerImage" alt="">
      <div class="photo-viewer-caption"><span id="photoViewerCaption"></span><button class="button button-quiet button-small" type="button" id="photoViewerSource">View source ↗</button></div>
    </dialog>
  </section>`;
}

function renderTour() {
  const nextDate = tourDates.map(item => {
    const [month, day, year] = item.date.replace(' · ', ' ').split(' ');
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
    return { ...item, dateValue: new Date(Number(year), monthIndex, Number(day)) };
  }).filter(item => item.dateValue >= new Date(new Date().setHours(0, 0, 0, 0)))
    .sort((first, second) => first.dateValue - second.dateValue)[0];
  return `<section class="page-enter">
    <header class="page-heading"><div><p class="page-kicker">WHEN THE LIGHTS GO UP</p><h1>Meet me <em>out there.</em></h1></div><p class="page-heading-note">Tour details are only shown when confirmed.<br>No made-up dates, ever.</p></header>
    <section class="tour-card tour-intro">
      <div class="tour-copy"><p class="page-kicker">THE UNRAVELED TOUR · 2026/27</p><h2>The next nights<br>to sing every word.</h2><p>Dates from the fan-site event board. Ticket availability and details can change, so check the official listing before making plans.</p><button class="button button-primary" type="button" data-external="${ticketUrl}">Official ticket listing ↗</button></div>
      <div class="tour-side"><span class="tour-star">✦</span><span class="page-kicker">SEE YOU OUT THERE</span></div>
    </section>
    <div class="tour-date-list">${tourDates.map((date, index) => `<article class="tour-date">
      <span class="tour-number">${String(index + 1).padStart(2, '0')}</span><span class="tour-date-label">${escapeHtml(date.date)}</span>
      <strong>${escapeHtml(date.city)}</strong><span class="tour-venue">${escapeHtml(date.venue)}</span>
      <button class="button button-quiet button-small" type="button" data-external="${ticketUrl}">Tickets ↗</button>
    </article>`).join('')}</div>
    <p class="tour-disclaimer">Dates and ticket links are from the fan-site listing. Check <button type="button" data-external="${tourSourceUrl}">Live Nation’s announcement</button> and Ticketmaster for current details.</p>
    ${nextDate ? `<section class="tour-countdown panel" data-tour-target="${nextDate.dateValue.getTime()}"><div><p class="panel-label">THE NEXT LISTED SHOW · ${escapeHtml(nextDate.city)}</p><h2>${escapeHtml(nextDate.date)}</h2></div><div class="holiday-clock"><span><strong data-countdown-days>—</strong><small>days</small></span><span><strong data-countdown-hours>—</strong><small>hours</small></span><span><strong data-countdown-minutes>—</strong><small>minutes</small></span></div></section>` : ''}
    <section class="home-section holiday-section"><div class="section-heading"><div><p class="panel-label">LITTLE MOMENTS WORTH COUNTING DOWN TO</p><h2>Save the celebration.</h2></div></div><div class="holiday-grid">${holidays.map(holiday => `<article class="holiday-card panel" data-holiday-month="${holiday.month}" data-holiday-day="${holiday.day}"><p class="panel-label">${escapeHtml(holiday.name)}</p><h3 data-holiday-heading></h3><p>${escapeHtml(holiday.note)}</p><div class="holiday-clock"><span><strong data-countdown-days>—</strong><small>days</small></span><span><strong data-countdown-hours>—</strong><small>hours</small></span><span><strong data-countdown-minutes>—</strong><small>minutes</small></span></div></article>`).join('')}</div></section>
    <section class="home-section panel"><p class="panel-label">FROM THE FAN SITE</p><h2>See the live-date board</h2><p class="panel-copy">Open the website’s events section for its latest fan-site countdowns and ticket links.</p><button class="button button-quiet button-small" type="button" data-action="visit-tour">Open events ↗</button></section>
  </section>`;
}

function updateCountdowns() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  for (const card of $$('.holiday-card[data-holiday-month]')) {
    const month = Number(card.dataset.holidayMonth);
    const day = Number(card.dataset.holidayDay);
    let target = new Date(today.getFullYear(), month, day);
    if (target < today) target = new Date(today.getFullYear() + 1, month, day);
    const remaining = Math.max(0, target.getTime() - now.getTime());
    const totalMinutes = Math.floor(remaining / 60_000);
    $('[data-holiday-heading]', card).textContent = remaining === 0
      ? `It’s ${holidays.find(item => item.month === month && item.day === day)?.name || 'today'}!`
      : target.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
    $('[data-countdown-days]', card).textContent = String(Math.floor(totalMinutes / 1440)).padStart(2, '0');
    $('[data-countdown-hours]', card).textContent = String(Math.floor((totalMinutes % 1440) / 60)).padStart(2, '0');
    $('[data-countdown-minutes]', card).textContent = String(totalMinutes % 60).padStart(2, '0');
  }
  const tourClock = $('[data-tour-target]');
  if (tourClock) {
    const remaining = Math.max(0, Number(tourClock.dataset.tourTarget) - now.getTime());
    const totalMinutes = Math.floor(remaining / 60_000);
    $('[data-countdown-days]', tourClock).textContent = String(Math.floor(totalMinutes / 1440)).padStart(2, '0');
    $('[data-countdown-hours]', tourClock).textContent = String(Math.floor((totalMinutes % 1440) / 60)).padStart(2, '0');
    $('[data-countdown-minutes]', tourClock).textContent = String(totalMinutes % 60).padStart(2, '0');
  }
}

function renderAuthGate(title, copy) {
  return `<section class="auth-layout">
    <div class="auth-art"><h2>Find your<br>people.</h2><p>A place for the fans who know every word by heart.</p></div>
    <div class="panel auth-card"><p class="page-kicker">YOUR ACCOUNT, YOUR SPACE</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(copy)}</p><button class="button button-primary" type="button" data-page="profile">Go to sign in ↗</button><p class="form-status" id="pageStatus" role="status" aria-live="polite"></p></div>
  </section>`;
}

function renderAuthForm() {
  const isSignUp = authMode === 'signup';
  return `<section class="auth-layout">
    <div class="auth-art"><h2>Make room<br>for the feeling.</h2><p>Your account keeps your fan library and community in sync across the site and desktop app.</p></div>
    <form class="panel auth-card" id="authForm">
      <p class="page-kicker">${isSignUp ? 'NEW HERE? COME ON IN' : 'YOUR LITTLE CORNER'}</p>
      <h2>${isSignUp ? 'Join the fan circle.' : 'Welcome back.'}</h2>
      <p>${isSignUp ? 'Create an account to save favorites, make playlists, and join the conversation.' : 'Sign in with the same account you use on the fan site.'}</p>
      <label class="field"><span>Email</span><input id="authEmail" name="email" type="email" maxlength="254" autocomplete="email" required placeholder="you@example.com"></label>
      <label class="field"><span>Password</span><input id="authPassword" name="password" type="password" minlength="8" maxlength="128" autocomplete="${isSignUp ? 'new-password' : 'current-password'}" required placeholder="At least 8 characters"></label>
      ${isSignUp ? '<p class="panel-copy">If email confirmation is enabled, check your inbox before signing in.</p>' : ''}
      <button class="button button-primary" id="authSubmit" type="submit">${isSignUp ? 'Create account ↗' : 'Sign in ↗'}</button>
      <button class="auth-toggle" type="button" data-auth-toggle>${isSignUp ? 'Already have an account? Sign in.' : 'New to the fan circle? Create an account.'}</button>
      <p class="form-status" id="authStatus" role="status" aria-live="polite"></p>
    </form>
  </section>`;
}

function renderProfile() {
  if (!currentUser) return renderAuthForm();
  const name = displayName();
  const avatar = safeAvatar(profile?.avatar_url);
  return `<section class="page-enter">
    <header class="page-heading"><div><p class="page-kicker">YOUR CUSTOM LITTLE CORNER</p><h1>Make it <em>yours.</em></h1></div><p class="page-heading-note">Your fan-site profile works here too.<br>One account, one community.</p></header>
    <div class="profile-layout">
      <aside class="panel profile-intro">
        <div class="account-header"><span class="account-avatar-large">${avatar ? `<img src="${avatar}" alt="">` : escapeHtml(name.slice(0, 1).toUpperCase())}</span><div><p class="panel-label">SIGNED IN AS</p><h2>${escapeHtml(name)}</h2></div></div>
        <p>${escapeHtml(currentUser.email || '')}</p>
        <p>${currentUser.email_confirmed_at ? '✦ Email verified' : 'Email confirmation may still be pending.'}</p>
        <div class="panel home-section"><p class="panel-label">YOUR LIBRARY</p><strong>${favorites.size} favorite${favorites.size === 1 ? '' : 's'} · ${playlists.length} playlist${playlists.length === 1 ? '' : 's'}</strong></div>
        <button class="button button-quiet" type="button" data-action="sign-out">Sign out ↗</button>
      </aside>
      <form class="panel profile-form" id="profileForm">
        <div><p class="panel-label">DISPLAY NAME & PHOTO</p><h2>A little about you.</h2><p class="panel-copy">Choose the name and picture you want other fans to see.</p></div>
        <label class="field"><span>Display name</span><input id="profileName" type="text" maxlength="40" required value="${escapeHtml(name)}"></label>
        <label class="field"><span>Profile photo</span><input id="profileImage" type="file" accept="image/*"><small class="panel-copy">Images are cropped and resized before they’re saved to your account.</small></label>
        <button class="button button-primary" id="profileSave" type="submit">Save profile ↗</button>
        <p class="form-status" id="profileStatus" role="status" aria-live="polite"></p>
      </form>
    </div>
  </section>`;
}

function lastActiveLabel(timestamp) {
  if (!timestamp) return 'Last active unknown';
  const parsed = Date.parse(timestamp);
  if (Number.isNaN(parsed)) return 'Last active unknown';
  const elapsed = Math.max(0, Date.now() - parsed);
  if (elapsed < 120_000) return 'Last active just now';
  const minutes = Math.floor(elapsed / 60_000);
  if (minutes < 60) return `Last active ${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Last active ${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `Last active ${days}d ago`;
  return `Last active ${new Date(parsed).toLocaleDateString()}`;
}

function personStatus(person) {
  const row = presence.get(person.user_id);
  const lastActive = Date.parse(row?.last_active_at);
  const recent = !Number.isNaN(lastActive) && Date.now() - lastActive < 2 * 60_000;
  const mode = row?.status_mode || 'offline';
  if (mode === 'offline') return { mode, label: 'Offline', detail: lastActiveLabel(row?.last_active_at) };
  if (mode === 'do_not_disturb') return { mode, label: 'Do not disturb', detail: lastActiveLabel(row?.last_active_at) };
  if (mode === 'away') return { mode, label: 'Away', detail: lastActiveLabel(row?.last_active_at) };
  return recent
    ? { mode: 'online', label: 'Online now', detail: 'Last active just now' }
    : { mode: 'offline', label: 'Offline', detail: lastActiveLabel(row?.last_active_at) };
}

function onlineFanCount() {
  return directory.filter(person => person.user_id !== currentUser?.id && personStatus(person).mode === 'online').length;
}

function otherFanCount() {
  return directory.filter(person => person.user_id !== currentUser?.id).length;
}

function renderPresencePicker(id = 'presenceMode') {
  const options = [
    ['online', 'Online', 'Available to chat'],
    ['away', 'Away', 'Stepping away'],
    ['do_not_disturb', 'Do not disturb', 'Quiet mode'],
    ['offline', 'Appear offline', 'Hide your online status']
  ];
  return `<label class="presence-control" for="${id}"><span class="presence-control-icon">✳</span><span class="presence-control-copy"><strong>Your status</strong><small>Visible to other fans</small></span><select class="presence-select" id="${id}" data-presence-mode>${options.map(([value, label, description]) => `<option value="${value}" ${currentMode === value ? 'selected' : ''}>${label} · ${description}</option>`).join('')}</select></label>`;
}

function renderPeopleList() {
  const people = directory.filter(person => person.user_id !== currentUser?.id);
  if (!people.length) return '<div class="people-empty"><span>✳</span><strong>Your fan circle is just getting started.</strong><small>Check back soon to meet other fans.</small></div>';
  return people
    .sort((first, second) => Number(personStatus(second).mode === 'online') - Number(personStatus(first).mode === 'online')
      || first.display_name.localeCompare(second.display_name))
    .map(person => {
    const status = personStatus(person);
    const selected = currentPage === 'messages' && selectedPeer === person.user_id;
    return `<button class="fan-row ${selected ? 'active' : ''}" type="button" data-open-peer="${escapeHtml(person.user_id)}" aria-pressed="${selected}">
      ${avatarMarkup(person.avatar_url, person.display_name)}
      <span class="fan-row-copy"><strong>${escapeHtml(person.display_name)}</strong><small class="fan-status-label ${status.mode}"><i class="presence-dot ${status.mode}"></i>${escapeHtml(status.label)}</small><small class="fan-last-active">${escapeHtml(status.detail)}</small></span>
      <span class="fan-row-arrow" aria-hidden="true">${selected ? '●' : '↗'}</span>
    </button>`;
  }).join('');
}

function renderCommunity() {
  if (!currentUser) return renderAuthGate('Join the conversation', 'Sign in to meet other fans, share a thought in the group chat, or send a private message.');
  return `<section class="page-enter">
    <header class="page-heading"><div><p class="page-kicker">SAY IT WITH YOUR WHOLE CHEST</p><h1>The fan <em>circle.</em></h1></div><p class="page-heading-note">Good vibes, kind people, and all the songs<br>that hit a little too close.</p></header>
    <div class="chat-layout">
      <section class="panel chat-main social-card">
        <div class="chat-topline"><span><p class="panel-label">THE GROUP ROOM · LIVE</p><h2>Everybody’s here.</h2><span class="room-presence" id="fanOnlineCount">✳ ${onlineFanCount()} fans online</span></span><small>Be kind. Keep it fan-friendly.</small></div>
        <div class="chat-messages" id="groupMessages" aria-live="polite"><div class="empty-state"><span>✳</span><p>Loading the fan circle…</p></div></div>
        <form class="chat-composer" id="groupForm">
          <div class="chat-compose-main"><label class="sr-only" for="groupMessage">Write a group message</label><input class="text-input" id="groupMessage" maxlength="500" placeholder="Say something lovely…"><button class="button button-primary" id="groupSend" type="submit">Send ↗</button></div>
          <div class="chat-compose-tools"><input id="groupFile" type="file" accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,application/pdf,text/plain,text/csv,application/zip,application/rtf,application/msword,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation" hidden><button class="clip-muted" type="button" data-select-file="group" aria-label="Choose a photo, animated GIF, video, or document">＋ Photo / video</button><button class="clip-muted" type="button" data-gif-picker="group" aria-controls="groupGifPicker" aria-expanded="false" aria-label="Search GIPHY for a GIF">GIFs ✨</button><small id="groupFileName">Photos, videos, documents · up to 10 MB</small></div>
        </form>
        ${renderGifPicker('group')}
        <p class="form-status" id="groupStatus" role="status" aria-live="polite"></p>
      </section>
      <aside class="panel chat-aside social-card">
        <div class="people-heading"><p class="panel-label">YOUR PEOPLE</p><h2>Fan circle</h2><p class="panel-copy">Choose a fan to start a private conversation.</p></div>
        ${renderPresencePicker()}
        <div class="people-list-heading"><span>Fans</span><small>${otherFanCount()} profiles</small></div>
        <div class="fan-list" id="fanList">${renderPeopleList()}</div>
        <p class="form-status" id="peopleStatus" role="status"></p>
      </aside>
    </div>
  </section>`;
}

function renderDirectMessages() {
  if (!currentUser) return renderAuthGate('Your people are one sign-in away', 'Sign in to see fan profiles and send private messages. Your conversations are private to the participants.');
  const selected = directory.find(person => person.user_id === selectedPeer);
  return `<section class="page-enter">
    <header class="page-heading"><div><p class="page-kicker">PRIVATE BETWEEN YOU & THEM</p><h1>Your <em>messages.</em></h1></div><p class="page-heading-note">Select a fan to start a private conversation.<br>Only the two participants can read it.</p></header>
    <div class="message-layout">
      <aside class="panel message-people social-card"><div class="people-heading"><p class="panel-label">YOUR PEOPLE</p><h2>Messages</h2><p class="panel-copy">Private conversations between you and another fan.</p></div>
        ${renderPresencePicker('dmPresenceMode')}
        <div class="people-list-heading"><span>Fan circle</span><small>${otherFanCount()} profiles</small></div>
        <div class="message-people-list" id="messagePeople">${renderPeopleList()}</div><p class="form-status" id="peopleStatus" role="status"></p></aside>
      <section class="panel dm-panel social-card">
        <div class="dm-header"><span class="dm-contact-avatar">${selected ? avatarMarkup(selected.avatar_url, selected.display_name) : '♡'}</span><span class="dm-contact-copy"><p class="panel-label">A PRIVATE LITTLE CORNER</p><h2 id="dmHeading">${selected ? escapeHtml(selected.display_name) : 'Choose a fan'}</h2><small id="dmPresenceLabel">${selected ? `<i class="presence-dot ${personStatus(selected).mode}"></i>${escapeHtml(personStatus(selected).label)} · ${escapeHtml(personStatus(selected).detail)}` : 'Only you and the other fan can read these messages.'}</small></span><span class="dm-lock">PRIVATE<br>CHAT</span></div>
        <div class="dm-scroll" id="dmMessages">${selected ? '<div class="empty-state"><span>♡</span><p>Loading your conversation…</p></div>' : '<div class="empty-state"><span>♡</span><p>Choose someone from the fan circle to say hello.</p></div>'}</div>
        <form class="chat-composer" id="dmForm">
          <div class="chat-compose-main"><label class="sr-only" for="dmMessage">Write a private message</label><input class="text-input" id="dmMessage" maxlength="500" placeholder="${selected ? 'Write a private message…' : 'Choose a fan first…'}" ${selected ? '' : 'disabled'}><button class="button button-primary" id="dmSend" type="submit" ${selected ? '' : 'disabled'}>Send ↗</button></div>
          <div class="chat-compose-tools"><input id="dmFile" type="file" accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,application/pdf,text/plain,text/csv,application/zip,application/rtf,application/msword,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation" hidden ${selected ? '' : 'disabled'}><button class="clip-muted" type="button" data-select-file="dm" aria-label="Choose a photo, animated GIF, video, or document" ${selected ? '' : 'disabled'}>＋ Photo / video</button><button class="clip-muted" type="button" data-gif-picker="dm" aria-controls="dmGifPicker" aria-expanded="false" aria-label="Search GIPHY for a GIF" ${selected ? '' : 'disabled'}>GIFs ✨</button><small id="dmFileName">Photos, videos, documents · up to 10 MB</small></div>
        </form>
        ${renderGifPicker('dm', !selected)}
        <p class="form-status" id="dmStatus" role="status" aria-live="polite"></p>
      </section>
    </div>
  </section>`;
}

function renderSettings() {
  return `<section class="page-enter">
    <header class="page-heading"><div><p class="page-kicker">SET THE SCENE</p><h1>Make yourself <em>at home.</em></h1></div><p class="page-heading-note">These settings belong to the desktop app.<br>Your website preferences stay untouched.</p></header>
    <div class="settings-layout">
      <section class="panel settings-card"><p class="panel-label">THE LOOK</p><h2>Pick your light.</h2>
        <div class="settings-row"><span><strong>Darkroom</strong><small>Deep plum, dusty pink, and late-night listening.</small></span><div class="settings-choice"><button type="button" data-theme-choice="dark" class="${fanState.theme === 'dark' ? 'active' : ''}">Dark</button></div></div>
        <div class="settings-row"><span><strong>Daylight</strong><small>Soft paper, lavender, and a little more sun.</small></span><div class="settings-choice"><button type="button" data-theme-choice="light" class="${fanState.theme === 'light' ? 'active' : ''}">Light</button></div></div>
      </section>
      <section class="panel settings-card"><p class="panel-label">THE FEEL</p><h2>Motion & comfort.</h2>
        <div class="settings-row"><span><strong>Animations</strong><small>Transitions and decorative movement across the app.</small></span><div class="settings-choice"><button type="button" data-motion-choice="on" class="${fanState.motion ? 'active' : ''}">On</button><button type="button" data-motion-choice="off" class="${fanState.motion ? '' : 'active'}">Off</button></div></div>
        <div class="settings-row"><span><strong>Accessibility</strong><small>Your Windows reduced-motion preference is always respected.</small></span><span class="panel-label">SYSTEM AWARE</span></div>
      </section>
      <section class="panel settings-card"><p class="panel-label">YOUR DESKTOP EDITION</p><h2>About this app.</h2><div class="settings-row"><span><strong>Stellan Oli Oli</strong><small>Unofficial fan-made desktop app. Not affiliated with Olivia Rodrigo or her team.</small></span><span class="panel-label" id="settingsVersion">—</span></div><button class="button button-quiet" type="button" data-action="visit-site">Open the fan site ↗</button></section>
      <section class="panel settings-card"><p class="panel-label">YOUR PRIVATE JOURNAL</p><h2>Only on this computer.</h2><p class="panel-copy">Mood check-ins and journal notes are stored locally by the app. Your account data—favorites, playlists, profile, and community messages—is protected by your fan-site account.</p><button class="button button-quiet" type="button" data-page="profile">Manage your account ↗</button></section>
    </div>
  </section>`;
}

function renderPage(page = currentPage) {
  const nextPage = pageNames[page] ? page : 'home';
  if (currentPage !== nextPage) {
    if (currentPage === 'community') {
      pendingGroupFile = null;
      pendingGroupGif = null;
    }
    if (currentPage === 'messages') {
      pendingDmFile = null;
      pendingDmGif = null;
    }
  }
  currentPage = nextPage;
  $('#pageCrumb').textContent = pageNames[currentPage];
  $$('.nav-item').forEach(button => button.classList.toggle('active', button.dataset.page === currentPage));
  const renderers = {
    home: renderHome,
    eras: renderEras,
    discovery: renderDiscovery,
    oliclips: renderOliclips,
    gallery: renderGallery,
    tour: renderTour,
    music: renderMusic,
    community: renderCommunity,
    messages: renderDirectMessages,
    profile: renderProfile,
    settings: renderSettings
  };
  if (scrollRevealObserver) {
    scrollRevealObserver.disconnect();
    scrollRevealObserver = null;
  }
  pageHost.innerHTML = renderers[currentPage]();
  observeScrollReveals();
  $('#contentScroll').scrollTo({ top: 0, behavior: fanState.motion ? 'smooth' : 'auto' });
  if (currentPage === 'tour') updateCountdowns();
  if (currentPage === 'community' && currentUser) {
    void loadGroupMessages();
    void loadCommunityDirectory().catch(error => setInlineStatus(`Could not load the fan list: ${error.message}`, '#peopleStatus'));
  }
  if (currentPage === 'messages' && currentUser) {
    void loadCommunityDirectory().catch(error => setInlineStatus(`Could not load the fan list: ${error.message}`, '#peopleStatus'));
    void loadDirectMessages();
  }
  if (currentPage === 'settings') {
    void appApi.getAppVersion().then(version => {
      const versionLabel = `V${version}`;
      if ($('#settingsVersion')) $('#settingsVersion').textContent = versionLabel;
      $('#appVersion').textContent = versionLabel;
    }).catch(error => setStatus(`Could not load the app version: ${error.message}`));
  }
}

function observeScrollReveals(root = pageHost) {
  const elements = $$('.page-heading, .panel, .home-hero, .era-card, .clip-card, .polaroid, .tour-card, .track-row, .mood-panel, .discovery-card, .chat-message, .dm-bubble, .fan-row', root);
  if (!fanState.motion || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    elements.forEach(element => element.classList.add('scroll-reveal-visible'));
    return;
  }
  if (!scrollRevealObserver) {
    scrollRevealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('scroll-reveal-visible');
        scrollRevealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
  }
  elements.forEach((element, index) => {
    if (element.dataset.revealBound) return;
    element.dataset.revealBound = 'true';
    element.style.setProperty('--reveal-delay', `${Math.min(index * 38, 190)}ms`);
    element.classList.add('scroll-reveal');
    scrollRevealObserver.observe(element);
  });
}

async function loadFanState() {
  try {
    const saved = await appApi.getFanState();
    fanState = { ...fanState, ...saved };
    applyAppearance();
    renderPage(currentPage);
  } catch (error) {
    setStatus(`Could not load your fan desk: ${error.message}`);
  }
}

async function savePreference(theme, motion) {
  try {
    fanState = await appApi.setPreferences({ theme, motion });
    applyAppearance();
    renderPage(currentPage);
    setStatus('Your desktop appearance has been saved.');
  } catch (error) {
    setStatus(`Could not save your appearance: ${error.message}`);
  }
}

async function saveMood(mood) {
  try {
    fanState = await appApi.setMood(mood);
    renderPage('home');
    setStatus('Mood saved on this computer.');
  } catch (error) {
    setStatus(`Could not save your mood: ${error.message}`);
  }
}

async function initializeSupabase() {
  const url = window.ORACLE_SUPABASE_URL;
  const key = window.ORACLE_SUPABASE_ANON_KEY;
  if (!url || !key) return;
  supabase = createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
  });
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  await updateUser(data.session?.user || null);
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED') {
      void updateUser(session?.user || null);
    }
  });
}

async function updateUser(user) {
  const changed = currentUser?.id !== user?.id;
  currentUser = user;
  profile = null;
  if (changed) {
    pendingGroupFile = null;
    pendingDmFile = null;
    pendingGroupGif = null;
    pendingDmGif = null;
    favorites = new Set();
    playlists = [];
    playlistTracks = new Map();
    activePlaylistId = null;
    directory = [];
    presence = new Map();
  }
  if (!user) {
    selectedPeer = null;
    pendingGroupFile = null;
    pendingDmFile = null;
    pendingGroupGif = null;
    pendingDmGif = null;
    currentMode = 'online';
    if (realtimeChannel && supabase) {
      await supabase.removeChannel(realtimeChannel);
      realtimeChannel = null;
    }
    if (presenceTimer) window.clearInterval(presenceTimer);
    presenceTimer = null;
    updateIdentity();
    renderPage(currentPage);
    return;
  }

  try {
    await Promise.all([loadLibrary(), loadProfile()]);
    updateIdentity();
    if (changed) {
      await loadCommunityDirectory();
      startRealtime();
      void touchPresence();
      if (presenceTimer) window.clearInterval(presenceTimer);
      presenceTimer = window.setInterval(() => void touchPresence(), 60_000);
    }
    renderPage(currentPage);
  } catch (error) {
    updateIdentity();
    setStatus(`Could not load your account data: ${error.message}`);
    renderPage(currentPage);
  }
}

async function loadLibrary() {
  if (!currentUser || !supabase) return;
  const [favoriteResult, playlistResult, trackResult] = await Promise.all([
    supabase.from('song_favorites').select('song_id').eq('user_id', currentUser.id),
    supabase.from('playlists').select('id,name,created_at').eq('user_id', currentUser.id).order('created_at'),
    supabase.from('playlist_tracks').select('playlist_id,song_id').eq('user_id', currentUser.id)
  ]);
  if (favoriteResult.error) throw favoriteResult.error;
  if (playlistResult.error) throw playlistResult.error;
  if (trackResult.error) throw trackResult.error;
  favorites = new Set(favoriteResult.data.map(item => item.song_id));
  playlists = playlistResult.data;
  playlistTracks = new Map();
  for (const track of trackResult.data) {
    const savedTracks = playlistTracks.get(track.playlist_id) || [];
    savedTracks.push(track.song_id);
    playlistTracks.set(track.playlist_id, savedTracks);
  }
}

async function loadProfile() {
  if (!currentUser || !supabase) return;
  const { data, error } = await supabase.from('community_profiles')
    .select('user_id,display_name,avatar_url')
    .eq('user_id', currentUser.id)
    .maybeSingle();
  if (error) throw error;
  profile = data;
}

async function toggleFavorite(songId) {
  if (!currentUser) {
    renderPage('profile');
    setStatus('Sign in to save songs to your account.');
    return;
  }
  const wasSaved = favorites.has(songId);
  const query = wasSaved
    ? supabase.from('song_favorites').delete().eq('user_id', currentUser.id).eq('song_id', songId)
    : supabase.from('song_favorites').upsert({ user_id: currentUser.id, song_id: songId }, { onConflict: 'user_id,song_id' });
  const { error } = await query;
  if (error) {
    setStatus(`Could not update that favorite: ${error.message}`);
    return;
  }
  await loadLibrary();
  renderPage(currentPage);
}

async function addSongToPlaylist(songId, playlistId) {
  if (!playlistId || !currentUser) return;
  const { error } = await supabase.from('playlist_tracks').upsert({
    user_id: currentUser.id,
    playlist_id: playlistId,
    song_id: songId
  }, { onConflict: 'playlist_id,song_id' });
  if (error) {
    setStatus(`Could not add that song to your playlist: ${error.message}`);
    return;
  }
  await loadLibrary();
  renderPage('music');
  setStatus('Song added to your playlist.');
}

async function createPlaylist(form) {
  const name = $('#playlistName').value.trim();
  if (!name || !currentUser) return;
  const submit = $('#playlistForm button[type="submit"]');
  submit.disabled = true;
  setInlineStatus('');
  try {
    const { error } = await supabase.from('playlists').insert({ user_id: currentUser.id, name });
    if (error) throw error;
    await loadLibrary();
    activePlaylistId = null;
    renderPage('music');
    setInlineStatus('Playlist created.', '#playlistStatus');
  } catch (error) {
    setInlineStatus(`Could not create that playlist: ${error.message}`, '#playlistStatus');
    submit.disabled = false;
  }
}

async function removeSongFromPlaylist(playlistId, songId) {
  const { error } = await supabase.from('playlist_tracks').delete()
    .eq('playlist_id', playlistId).eq('song_id', songId).eq('user_id', currentUser.id);
  if (error) {
    setStatus(`Could not remove that song from the playlist: ${error.message}`);
    return;
  }
  await loadLibrary();
  renderPage('music');
}

async function deletePlaylist(playlistId) {
  const playlist = playlists.find(item => item.id === playlistId);
  if (!playlist || !window.confirm(`Delete “${playlist.name}” and its songs?`)) return;
  const { error } = await supabase.from('playlists').delete()
    .eq('id', playlistId).eq('user_id', currentUser.id);
  if (error) {
    setStatus(`Could not delete that playlist: ${error.message}`);
    return;
  }
  if (activePlaylistId === playlistId) activePlaylistId = null;
  await loadLibrary();
  renderPage('music');
}

async function savePrivateNote() {
  const input = $('#noteInput');
  const status = $('#noteStatus');
  const submit = $('#saveNoteButton');
  if (!input || !input.value.trim()) return;
  submit.disabled = true;
  status.textContent = '';
  try {
    fanState = await appApi.saveNote(input.value);
    renderPage('home');
    setInlineStatus('Saved. This one stays on your computer.', '#noteStatus');
  } catch (error) {
    status.textContent = `Could not save that note: ${error.message}`;
    submit.disabled = false;
  }
}

async function deletePrivateNote(id, button) {
  button.disabled = true;
  try {
    fanState = await appApi.deleteNote(id);
    renderPage('home');
  } catch (error) {
    button.disabled = false;
    setStatus(`Could not remove that note: ${error.message}`);
  }
}

async function signInOrSignUp(form) {
  if (!supabase) throw new Error('Account sign-in is unavailable because the cloud project is not configured.');
  const email = $('#authEmail').value.trim();
  const password = $('#authPassword').value;
  const submit = $('#authSubmit');
  submit.disabled = true;
  setInlineStatus('', '#authStatus');
  try {
    if (authMode === 'signup') {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: email.split('@')[0].slice(0, 40) } }
      });
      if (error) throw error;
      if (!data.session) {
        setInlineStatus('Account created. Check your email to confirm, then sign in here.', '#authStatus');
        return;
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    }
  } catch (error) {
    setInlineStatus(`Could not ${authMode === 'signup' ? 'create your account' : 'sign in'}: ${error.message}`, '#authStatus');
    submit.disabled = false;
  }
}

async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) setStatus(`Could not sign out: ${error.message}`);
}

function resizeAvatar(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Choose an image file.'));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      reject(new Error('Choose an image smaller than 10 MB.'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read that image.'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('Could not open that image.'));
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const side = Math.min(image.width, image.height);
        canvas.width = 320;
        canvas.height = 320;
        const context = canvas.getContext('2d');
        if (!context) {
          reject(new Error('Could not prepare that profile photo.'));
          return;
        }
        context.drawImage(image, (image.width - side) / 2, (image.height - side) / 2, side, side, 0, 0, 320, 320);
        const result = canvas.toDataURL('image/jpeg', 0.74);
        if (result.length > 950_000) {
          reject(new Error('Choose a smaller or simpler image.'));
          return;
        }
        resolve(result);
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

async function saveProfile(form) {
  const status = $('#profileStatus');
  const submit = $('#profileSave');
  const display = $('#profileName').value.trim();
  const file = $('#profileImage').files[0];
  if (!display) {
    status.textContent = 'Enter a display name.';
    return;
  }
  submit.disabled = true;
  status.textContent = 'Saving your profile…';
  try {
    const { data, error } = await supabase.auth.updateUser({ data: { display_name: display } });
    if (error) throw error;
    currentUser = data.user;
    if (file) {
      const avatar = await resizeAvatar(file);
      const { error: avatarError } = await supabase.from('community_profiles')
        .update({ avatar_url: avatar, updated_at: new Date().toISOString() })
        .eq('user_id', currentUser.id);
      if (avatarError) throw avatarError;
    }
    await loadProfile();
    updateIdentity();
    renderPage('profile');
    setInlineStatus('Profile saved to your account.', '#profileStatus');
  } catch (error) {
    status.textContent = `Could not save your profile: ${error.message}`;
    submit.disabled = false;
  }
}

async function loadCommunityDirectory() {
  if (!currentUser || !supabase) return;
  const [profilesResult, presenceResult] = await Promise.all([
    supabase.from('community_profiles').select('user_id,display_name,avatar_url').order('display_name'),
    supabase.from('community_presence').select('user_id,last_active_at,status_mode')
  ]);
  if (profilesResult.error) throw profilesResult.error;
  if (presenceResult.error) throw presenceResult.error;
  directory = profilesResult.data;
  presence = new Map(presenceResult.data.map(item => [item.user_id, item]));
  currentMode = presence.get(currentUser.id)?.status_mode || currentMode;
  $$('[data-presence-mode]').forEach(select => { select.value = currentMode; });
  if (currentPage === 'community' && $('#fanList')) {
    $('#fanList').innerHTML = renderPeopleList();
    $('#fanOnlineCount').textContent = `✳ ${onlineFanCount()} fans online`;
    observeScrollReveals($('#fanList'));
  }
  if (currentPage === 'messages' && $('#messagePeople')) {
    $('#messagePeople').innerHTML = renderPeopleList();
    observeScrollReveals($('#messagePeople'));
    const selected = directory.find(person => person.user_id === selectedPeer);
    if (selected && $('#dmPresenceLabel')) {
      const state = personStatus(selected);
      $('#dmPresenceLabel').innerHTML = `<i class="presence-dot ${state.mode}"></i>${escapeHtml(state.label)} · ${escapeHtml(state.detail)}`;
    }
  }
  if (currentPage === 'community' && $('#groupMessages')) void loadGroupMessages();
}

async function touchPresence(mode = null) {
  if (!currentUser || !supabase) return;
  try {
    const args = mode ? { p_status_mode: mode } : {};
    const { error } = await supabase.rpc('touch_community_presence', args);
    if (error) throw error;
    if (mode) currentMode = mode;
  } catch (error) {
    setStatus(`Could not update your fan-circle status: ${error.message}`);
  }
}

async function fetchGroupMessages() {
  const list = $('#groupMessages');
  if (!list || !currentUser) return;
  const { data, error } = await supabase.from('chat_messages')
    .select('id,user_id,display_name,body,created_at,attachment_path,attachment_name,attachment_type,gif_url')
    .order('created_at', { ascending: false })
    .limit(80);
  if (error) {
    setInlineStatus(`Could not load the fan chat: ${error.message}`, '#groupStatus');
    list.innerHTML = '<div class="empty-state"><span>!</span><p>The fan chat could not be loaded.</p></div>';
    return;
  }
  const messages = data.reverse();
  const ids = messages.map(message => message.id);
  let reactions = [];
  if (ids.length) {
    const result = await supabase.from('chat_message_reactions').select('message_id,user_id').in('message_id', ids);
    if (result.error) {
      setInlineStatus(`Could not load chat reactions: ${result.error.message}`, '#groupStatus');
      return;
    }
    reactions = result.data;
  }
  if (!$('#groupMessages')) return;
  list.innerHTML = messages.length ? (await Promise.all(messages.map(async message => {
    const author = directory.find(person => person.user_id === message.user_id);
    const messageReactions = reactions.filter(item => item.message_id === message.id);
    const likedByMe = messageReactions.some(item => item.user_id === currentUser.id);
    const media = await attachmentMarkup(message.attachment_path, message.attachment_name, message.attachment_type);
    const gif = gifMarkup(message.gif_url);
    return `<article class="chat-message">
      ${avatarMarkup(author?.avatar_url, message.display_name)}
      <div class="chat-message-body"><div class="chat-message-meta"><strong>${escapeHtml(message.display_name)}</strong><time>${escapeHtml(timeLabel(message.created_at))}</time></div>
        <p>${escapeHtml(message.body)}</p>${media}${gif}
        <div class="chat-message-tools"><button type="button" data-react-message="${message.id}" aria-pressed="${likedByMe}">♥ ${messageReactions.length || ''}</button>${message.user_id === currentUser.id ? `<button type="button" data-delete-message="${message.id}">delete</button>` : ''}</div>
      </div>
    </article>`;
  }))).join('') : '<div class="empty-state"><span>✳</span><p>Be the first to say hello.</p></div>';
  list.scrollTop = list.scrollHeight;
  observeScrollReveals(list);
}

async function loadGroupMessages() {
  try {
    await fetchGroupMessages();
  } catch (error) {
    setInlineStatus(`Could not load the fan chat: ${error.message}`, '#groupStatus');
    const list = $('#groupMessages');
    if (list) list.innerHTML = '<div class="empty-state"><span>!</span><p>The fan chat could not be loaded.</p></div>';
  }
}

async function sendGroupMessage(form) {
  const input = $('#groupMessage');
  const send = $('#groupSend');
  const body = input.value.trim();
  const file = pendingGroupFile;
  const gif = pendingGroupGif;
  if ((!body && !file && !gif) || !currentUser) {
    setInlineStatus('Write a message, attach a file, or choose a GIF first.', '#groupStatus');
    return;
  }
  if (file && gif) {
    setInlineStatus('Choose either a file or a GIF for each message.', '#groupStatus');
    return;
  }
  send.disabled = true;
  setInlineStatus('');
  let uploadedPath = null;
  try {
    const attachment = file ? await uploadAttachment(file, false) : null;
    uploadedPath = attachment?.attachment_path || null;
    const { error } = await supabase.from('chat_messages').insert({
      user_id: currentUser.id,
      display_name: (displayName() || 'Fan').slice(0, 40),
      body,
      ...(gif ? { gif_id: gif.id, gif_url: gif.url } : {}),
      ...(attachment || {})
    });
    if (error) throw error;
    pendingGroupFile = null;
    pendingGroupGif = null;
    input.value = '';
    $('#groupFile').value = '';
    $('#groupFileName').textContent = 'Also accepts documents · up to 10 MB';
    updateGifSelection('group', null);
    await loadGroupMessages();
  } catch (error) {
    if (uploadedPath) {
      const cleanup = await supabase.storage.from('community-chat-files').remove([uploadedPath]);
      if (cleanup.error) {
        setInlineStatus(`Could not send your message: ${error.message}. Uploaded-file cleanup also failed: ${cleanup.error.message}`, '#groupStatus');
        send.disabled = false;
        return;
      }
    }
    setInlineStatus(`Could not send your message: ${error.message}`, '#groupStatus');
  } finally {
    send.disabled = false;
  }
}

async function toggleReaction(messageId) {
  const existing = await supabase.from('chat_message_reactions').select('message_id')
    .eq('message_id', messageId).eq('user_id', currentUser.id).maybeSingle();
  if (existing.error) {
    setInlineStatus(`Could not check that reaction: ${existing.error.message}`, '#groupStatus');
    return;
  }
  const result = existing.data
    ? await supabase.from('chat_message_reactions').delete().eq('message_id', messageId).eq('user_id', currentUser.id)
    : await supabase.from('chat_message_reactions').insert({ message_id: messageId, user_id: currentUser.id, reaction: 'like' });
  if (result.error) {
    setInlineStatus(`Could not update that reaction: ${result.error.message}`, '#groupStatus');
    return;
  }
  await loadGroupMessages();
}

async function deleteGroupMessage(messageId) {
  const { error } = await supabase.from('chat_messages').delete().eq('id', messageId).eq('user_id', currentUser.id);
  if (error) {
    setInlineStatus(`Could not delete that message: ${error.message}`, '#groupStatus');
    return;
  }
  await loadGroupMessages();
}

async function fetchDirectMessages() {
  const list = $('#dmMessages');
  if (!list || !currentUser || !selectedPeer) return;
  const { data, error } = await supabase.from('direct_messages')
    .select('id,sender_id,recipient_id,body,created_at,attachment_path,attachment_name,attachment_type,gif_url')
    .or(`and(sender_id.eq.${currentUser.id},recipient_id.eq.${selectedPeer}),and(sender_id.eq.${selectedPeer},recipient_id.eq.${currentUser.id})`)
    .order('created_at', { ascending: true })
    .limit(100);
  if (error) {
    setInlineStatus(`Could not load this conversation: ${error.message}`, '#dmStatus');
    list.innerHTML = '<div class="empty-state"><span>!</span><p>This conversation could not be loaded.</p></div>';
    return;
  }
  if (!$('#dmMessages')) return;
  list.innerHTML = data.length ? (await Promise.all(data.map(async message => {
    const media = await attachmentMarkup(message.attachment_path, message.attachment_name, message.attachment_type);
    const gif = gifMarkup(message.gif_url);
    return `
    <article class="dm-bubble ${message.sender_id === currentUser.id ? 'mine' : ''}">
      <p>${escapeHtml(message.body)}</p>${media}${gif}<time>${escapeHtml(timeLabel(message.created_at))}</time>
    </article>`;
  }))).join('') : '<div class="empty-state"><span>♡</span><p>Start the conversation with a kind hello.</p></div>';
  list.scrollTop = list.scrollHeight;
  observeScrollReveals(list);
}

async function loadDirectMessages() {
  try {
    await fetchDirectMessages();
  } catch (error) {
    setInlineStatus(`Could not load this conversation: ${error.message}`, '#dmStatus');
    const list = $('#dmMessages');
    if (list) list.innerHTML = '<div class="empty-state"><span>!</span><p>This conversation could not be loaded.</p></div>';
  }
}

async function sendDirectMessage(form) {
  const input = $('#dmMessage');
  const send = $('#dmSend');
  const body = input.value.trim();
  const file = pendingDmFile;
  const gif = pendingDmGif;
  if ((!body && !file && !gif) || !selectedPeer || !currentUser) {
    setInlineStatus('Write a message, attach a file, or choose a GIF first.', '#dmStatus');
    return;
  }
  if (file && gif) {
    setInlineStatus('Choose either a file or a GIF for each message.', '#dmStatus');
    return;
  }
  send.disabled = true;
  setInlineStatus('');
  let uploadedPath = null;
  try {
    const attachment = file ? await uploadAttachment(file, true) : null;
    uploadedPath = attachment?.attachment_path || null;
    const { error } = await supabase.from('direct_messages').insert({
      sender_id: currentUser.id,
      recipient_id: selectedPeer,
      body,
      ...(gif ? { gif_id: gif.id, gif_url: gif.url } : {}),
      ...(attachment || {})
    });
    if (error) throw error;
    pendingDmFile = null;
    pendingDmGif = null;
    input.value = '';
    $('#dmFile').value = '';
    $('#dmFileName').textContent = 'Also accepts documents · up to 10 MB';
    updateGifSelection('dm', null);
    await loadDirectMessages();
  } catch (error) {
    if (uploadedPath) {
      const cleanup = await supabase.storage.from('community-chat-files').remove([uploadedPath]);
      if (cleanup.error) {
        setInlineStatus(`Could not send your message: ${error.message}. Uploaded-file cleanup also failed: ${cleanup.error.message}`, '#dmStatus');
        send.disabled = false;
        return;
      }
    }
    setInlineStatus(`Could not send your message: ${error.message}`, '#dmStatus');
  } finally {
    send.disabled = false;
  }
}

const allowedAttachmentTypes = new Set([
  ...imageAttachmentTypes, 'video/mp4',
  'application/pdf', 'text/plain', 'text/csv', 'application/zip',
  'application/rtf', 'application/msword', 'application/vnd.ms-excel',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation'
]);

async function uploadAttachment(file, directMessage) {
  if (!file || file.size < 1 || file.size > 10 * 1024 * 1024) {
    throw new Error('Choose a file smaller than 10 MB.');
  }
  if (!allowedAttachmentTypes.has(file.type)) {
    throw new Error('This file type is not supported. Choose a photo, animated GIF, MP4 video, document, or text file.');
  }
  if (file.name.length > 255) throw new Error('The file name is too long.');
  const cleanName = file.name.replace(/[\\/\u0000-\u001f]/g, '_').slice(-200);
  const path = `${currentUser.id}/${directMessage ? 'dm/' : ''}${crypto.randomUUID()}-${cleanName}`;
  const { error } = await supabase.storage.from('community-chat-files').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type
  });
  if (error) throw error;
  return {
    attachment_path: path,
    attachment_name: file.name,
    attachment_type: file.type,
    attachment_size: file.size
  };
}

async function openAttachment(path) {
  try {
    const { data, error } = await supabase.storage.from('community-chat-files').createSignedUrl(path, 300);
    if (error) throw error;
    await openExternal(data.signedUrl);
  } catch (error) {
    setStatus(`Could not prepare that attachment: ${error.message}`);
  }
}

function startRealtime() {
  if (!supabase || !currentUser) return;
  if (realtimeChannel) void supabase.removeChannel(realtimeChannel);
  realtimeChannel = supabase.channel(`desktop-fan-${currentUser.id}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_messages' }, () => {
      if (currentPage === 'community') void loadGroupMessages();
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'chat_message_reactions' }, () => {
      if (currentPage === 'community') void loadGroupMessages();
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'community_profiles' }, () => {
      void loadCommunityDirectory().catch(error => setStatus(`Could not refresh the fan list: ${error.message}`));
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'direct_messages' }, payload => {
      if (currentPage === 'messages' && [payload.new.sender_id, payload.new.recipient_id].includes(currentUser?.id)) {
        void loadDirectMessages();
      }
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'community_presence' }, () => {
      void loadCommunityDirectory().catch(error => setStatus(`Could not refresh fan statuses: ${error.message}`));
    })
    .subscribe(status => {
      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        setStatus(`Live fan-circle updates are unavailable (${status.toLowerCase()}).`);
      }
    });
}

function updateSearch(query) {
  const results = $('#searchResults');
  const term = query.trim().toLowerCase();
  if (!term) {
    results.hidden = true;
    results.replaceChildren();
    return;
  }
  const matches = [
    ...songs.filter(song => `${song.title} ${song.era}`.toLowerCase().includes(term)).map(song => ({
      label: `${song.title} · ${song.era}`, icon: '♫', page: 'eras', era: song.era
    })),
    ...Object.keys(pageNames).map(page => ({ label: pageNames[page].toLowerCase(), icon: '✦', page }))
      .filter(item => item.label.includes(term))
  ].slice(0, 8);
  results.innerHTML = matches.length ? matches.map((item, index) => `
    <button class="search-result" type="button" data-search-index="${index}"><span>${item.icon}</span>${escapeHtml(item.label)}</button>`).join('')
    : '<div class="search-result">No matches found.</div>';
  searchItems = matches;
  results.hidden = false;
}

async function openExternal(value) {
  try {
    await appApi.openExternal(value);
  } catch (error) {
    setStatus(`Could not open that link: ${error.message}`);
  }
}

document.addEventListener('click', event => {
  const pageButton = event.target.closest('[data-page]');
  if (pageButton) {
    renderPage(pageButton.dataset.page);
    return;
  }
  const eraButton = event.target.closest('[data-era]');
  if (eraButton) {
    activeEra = eraButton.dataset.era;
    renderPage('eras');
    return;
  }
  const moodButton = event.target.closest('[data-mood]');
  if (moodButton) {
    void saveMood(moodButton.dataset.mood);
    return;
  }
  const discoveryMoodButton = event.target.closest('[data-discovery-mood]');
  if (discoveryMoodButton) {
    discoveryMood = discoveryMoodButton.dataset.discoveryMood;
    renderPage('discovery');
    return;
  }
  const quizAnswer = event.target.closest('[data-quiz-question]');
  if (quizAnswer) {
    quizAnswers[Number(quizAnswer.dataset.quizQuestion)] = quizAnswer.dataset.quizEra;
    renderPage('discovery');
    return;
  }
  if (event.target.closest('[data-quiz-reset]')) {
    quizAnswers = [];
    renderPage('discovery');
    return;
  }
  const favoriteButton = event.target.closest('[data-favorite]');
  if (favoriteButton) {
    void toggleFavorite(favoriteButton.dataset.favorite);
    return;
  }
  const playlistView = event.target.closest('[data-view-playlist]');
  if (playlistView) {
    activePlaylistId = playlistView.dataset.viewPlaylist;
    renderPage('music');
    return;
  }
  const playlistDelete = event.target.closest('[data-delete-playlist]');
  if (playlistDelete) {
    void deletePlaylist(playlistDelete.dataset.deletePlaylist);
    return;
  }
  const playlistTrackRemove = event.target.closest('[data-remove-track]');
  if (playlistTrackRemove) {
    const [playlistId, songId] = playlistTrackRemove.dataset.removeTrack.split(':');
    void removeSongFromPlaylist(playlistId, songId);
    return;
  }
  if (event.target.closest('[data-close-playlist]')) {
    activePlaylistId = null;
    renderPage('music');
    return;
  }
  const noteButton = event.target.closest('[data-delete-note]');
  if (noteButton) {
    void deletePrivateNote(noteButton.dataset.deleteNote, noteButton);
    return;
  }
  const externalButton = event.target.closest('[data-external]');
  if (externalButton) {
    void openExternal(externalButton.dataset.external);
    return;
  }
  const closePhotoButton = event.target.closest('[data-close-photo]');
  if (closePhotoButton) {
    $('#photoViewer')?.close();
    return;
  }
  const photoCard = event.target.closest('[data-open-photo]');
  if (photoCard) {
    if (event.target.closest('[data-external]')) return;
    const photo = photos[Number(photoCard.dataset.openPhoto)];
    if (!photo) return;
    $('#photoViewerImage').src = `../images/${photo.src}`;
    $('#photoViewerImage').alt = photo.alt;
    $('#photoViewerCaption').textContent = photo.caption;
    $('#photoViewerSource').dataset.external = photo.credit;
    $('#photoViewer').showModal();
    return;
  }
  const attachmentButton = event.target.closest('[data-open-attachment]');
  if (attachmentButton) {
    void openAttachment(attachmentButton.dataset.openAttachment);
    return;
  }
  const fileButton = event.target.closest('[data-select-file]');
  if (fileButton) {
    $(`#${fileButton.dataset.selectFile}File`).click();
    return;
  }
  const gifPickerButton = event.target.closest('[data-gif-picker]');
  if (gifPickerButton) {
    const scope = gifPickerButton.dataset.gifPicker;
    const picker = $(`#${scope}GifPicker`);
    if (!picker) return;
    picker.hidden = !picker.hidden;
    gifPickerButton.setAttribute('aria-expanded', String(!picker.hidden));
    if (!picker.hidden) $(`#${scope}GifQuery`)?.focus();
    return;
  }
  const gifResult = event.target.closest('[data-select-gif]');
  if (gifResult) {
    const scope = gifResult.closest('#groupGifResults') ? 'group' : 'dm';
    const gif = gifChoices.get(gifResult.dataset.selectGif);
    if (!gif) return;
    if (scope === 'group') {
      pendingGroupGif = gif;
      pendingGroupFile = null;
      $('#groupFile').value = '';
      $('#groupFileName').textContent = 'Photos, videos, documents · up to 10 MB';
    } else {
      pendingDmGif = gif;
      pendingDmFile = null;
      $('#dmFile').value = '';
      $('#dmFileName').textContent = 'Photos, videos, documents · up to 10 MB';
    }
    updateGifSelection(scope, gif);
    $(`#${scope}GifPicker`).hidden = true;
    setInlineStatus('GIF ready to send.', scope === 'group' ? '#groupStatus' : '#dmStatus');
    return;
  }
  const clearGifButton = event.target.closest('[data-clear-gif]');
  if (clearGifButton) {
    const scope = clearGifButton.dataset.clearGif;
    if (scope === 'group') pendingGroupGif = null;
    else pendingDmGif = null;
    updateGifSelection(scope, null);
    setInlineStatus('', scope === 'group' ? '#groupStatus' : '#dmStatus');
    return;
  }
  const actionButton = event.target.closest('[data-action]');
  if (actionButton) {
    const { action } = actionButton.dataset;
    if (action === 'visit-site') void appApi.openSection('home').catch(error => setStatus(`Could not open the fan site: ${error.message}`));
    if (action === 'visit-tour') void appApi.openSection('tour').catch(error => setStatus(`Could not open the events page: ${error.message}`));
    if (action === 'sign-out') void signOut();
    if (action === 'react-message') void toggleReaction(actionButton.dataset.id);
    if (action === 'delete-message') void deleteGroupMessage(actionButton.dataset.id);
  }
  const reaction = event.target.closest('[data-react-message]');
  if (reaction) {
    void toggleReaction(reaction.dataset.reactMessage);
    return;
  }
  const deletion = event.target.closest('[data-delete-message]');
  if (deletion) {
    void deleteGroupMessage(deletion.dataset.deleteMessage);
    return;
  }
  const toggleAuth = event.target.closest('[data-auth-toggle]');
  if (toggleAuth) {
    authMode = authMode === 'signin' ? 'signup' : 'signin';
    renderPage('profile');
    return;
  }
  const peerButton = event.target.closest('[data-open-peer]');
  if (peerButton) {
    pendingDmFile = null;
    pendingDmGif = null;
    selectedPeer = peerButton.dataset.openPeer;
    renderPage('messages');
    return;
  }
  const themeButton = event.target.closest('[data-theme-choice]');
  if (themeButton) {
    void savePreference(themeButton.dataset.themeChoice, fanState.motion);
    return;
  }
  const motionButton = event.target.closest('[data-motion-choice]');
  if (motionButton) {
    void savePreference(fanState.theme, motionButton.dataset.motionChoice === 'on');
    return;
  }
  const videoButton = event.target.closest('[data-toggle-video]');
  if (videoButton) {
    const video = $$('.clip-card video')[Number(videoButton.dataset.toggleVideo)];
    if (!video) return;
    video.muted = !video.muted;
    videoButton.textContent = video.muted ? 'Muted ♫' : 'Sound on ♫';
    videoButton.setAttribute('aria-pressed', String(video.muted));
    return;
  }
  const searchButton = event.target.closest('[data-search-index]');
  if (searchButton) {
    const item = searchItems[Number(searchButton.dataset.searchIndex)];
    if (item) {
      if (item.era) activeEra = item.era;
      $('#globalSearch').value = '';
      $('#searchResults').hidden = true;
      renderPage(item.page);
    }
  }
});

document.addEventListener('submit', event => {
  const form = event.target;
  if (form.matches('[data-gif-search-form]')) {
    event.preventDefault();
    void searchGifs(form.dataset.gifSearchForm);
  } else if (form.id === 'noteForm') {
    event.preventDefault();
    void savePrivateNote();
  } else if (form.id === 'authForm') {
    event.preventDefault();
    void signInOrSignUp(form);
  } else if (form.id === 'profileForm') {
    event.preventDefault();
    void saveProfile(form);
  } else if (form.id === 'playlistForm') {
    event.preventDefault();
    void createPlaylist(form);
  } else if (form.id === 'groupForm') {
    event.preventDefault();
    void sendGroupMessage(form);
  } else if (form.id === 'dmForm') {
    event.preventDefault();
    void sendDirectMessage(form);
  }
});

document.addEventListener('change', event => {
  const playlistSelector = event.target.closest('[data-playlist-for]');
  if (playlistSelector) {
    void addSongToPlaylist(playlistSelector.dataset.playlistFor, playlistSelector.value);
    playlistSelector.value = '';
    return;
  }
  if (event.target.matches('[data-presence-mode]')) {
    void touchPresence(event.target.value).then(() => loadCommunityDirectory())
      .catch(error => setInlineStatus(`Could not update your status: ${error.message}`, '#peopleStatus'));
    return;
  }
  if (event.target.id === 'groupFile' || event.target.id === 'dmFile') {
    const directMessage = event.target.id === 'dmFile';
    const file = event.target.files[0] || null;
    const statusSelector = directMessage ? '#dmStatus' : '#groupStatus';
    if (file && (file.size < 1 || file.size > 10 * 1024 * 1024 || !allowedAttachmentTypes.has(file.type))) {
      setInlineStatus(file.size > 10 * 1024 * 1024
        ? 'Choose a file smaller than 10 MB.'
        : 'That file type is not supported. Choose a photo, animated GIF, MP4 video, document, or text file.', statusSelector);
      event.target.value = '';
      if (directMessage) pendingDmFile = null;
      else pendingGroupFile = null;
      return;
    }
    if (directMessage) {
      pendingDmFile = file;
      pendingDmGif = null;
      $('#dmFileName').textContent = file?.name || 'Also accepts documents · up to 10 MB';
      updateGifSelection('dm', null);
    } else {
      pendingGroupFile = file;
      pendingGroupGif = null;
      $('#groupFileName').textContent = file?.name || 'Also accepts documents · up to 10 MB';
      updateGifSelection('group', null);
    }
    setInlineStatus('');
  }
});

document.addEventListener('input', event => {
  if (event.target.id === 'globalSearch') updateSearch(event.target.value);
  if (event.target.id === 'noteInput') $('#noteCount').textContent = `${event.target.value.length} / 600`;
});

document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    $('#globalSearch').focus();
    return;
  }
  if (event.key === 'Escape') {
    $('#searchResults').hidden = true;
  }
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-open-photo]')) {
    event.preventDefault();
    event.target.click();
  }
});

document.addEventListener('click', event => {
  if (!event.target.closest('.topbar')) $('#searchResults').hidden = true;
});

function initialize() {
  applyAppearance();
  updateIdentity();
  renderPage('home');
  $('#bootScreen').classList.add('is-gone');
  window.setTimeout(() => $('#bootScreen')?.remove(), 700);
  void appApi.getAppVersion().then(version => { $('#appVersion').textContent = `V${version}`; })
    .catch(error => setStatus(`Could not load the app version: ${error.message}`));
  void loadFanState();
  window.setInterval(() => {
    if (currentPage === 'tour') updateCountdowns();
  }, 60_000);
  void initializeSupabase().catch(error => {
    setStatus(`Could not connect your fan-site account: ${error.message}`);
    if (currentPage === 'profile') setInlineStatus(error.message, '#authStatus');
  });
}

initialize();
