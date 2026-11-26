const appApi = window.stellanApp;
const noteForm = document.querySelector('#noteForm');
const noteInput = document.querySelector('#noteInput');
const saveNoteButton = document.querySelector('#saveNoteButton');
const notesList = document.querySelector('#notesList');
const formStatus = document.querySelector('#formStatus');
const appStatus = document.querySelector('#appStatus');
const moodCaption = document.querySelector('#moodCaption');
const noteCount = document.querySelector('#noteCount');
const noteLimit = document.querySelector('#noteLimit');
const moodCaptions = {
  electric: 'For the scream-sing chorus kind of day.',
  tender: 'Hold the soft parts close. They matter too.',
  chaotic: 'A little unhinged, a lot unforgettable.',
  dreamy: 'Let the lyrics take the long way home.'
};
let fanState = { mood: 'dreamy', notes: [] };

function showStatus(element, message) {
  element.textContent = message;
}

function renderMood(mood) {
  document.querySelectorAll('[data-mood]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.mood === mood));
  });
  moodCaption.textContent = moodCaptions[mood];
}

function renderNotes(notes) {
  notesList.replaceChildren();
  noteLimit.textContent = `${notes.length} / 30 NOTES`;

  if (notes.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-notes';
    const icon = document.createElement('span');
    icon.textContent = '✳';
    const text = document.createElement('span');
    text.textContent = 'Your first little memory goes here. Only you can see these notes.';
    empty.append(icon, text);
    notesList.append(empty);
    return;
  }

  for (const note of notes) {
    const card = document.createElement('article');
    card.className = 'note-card';
    const text = document.createElement('p');
    text.textContent = note.text;
    const savedAt = document.createElement('time');
    const timestamp = Date.parse(note.createdAt);
    savedAt.textContent = Number.isNaN(timestamp)
      ? 'Saved on this computer'
      : new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    const remove = document.createElement('button');
    remove.className = 'delete-note';
    remove.type = 'button';
    remove.dataset.deleteNote = note.id;
    remove.setAttribute('aria-label', 'Delete this private note');
    remove.textContent = '×';
    card.append(text, savedAt, remove);
    notesList.append(card);
  }
}

async function loadFanState() {
  try {
    fanState = await appApi.getFanState();
    renderMood(fanState.mood);
    renderNotes(fanState.notes);
  } catch (error) {
    showStatus(appStatus, `Could not load your fan desk: ${error.message}`);
  }
}

async function openSection(section) {
  showStatus(appStatus, '');
  try {
    await appApi.openSection(section);
    showStatus(appStatus, 'Your fan site is open in its own app window.');
  } catch (error) {
    showStatus(appStatus, `Could not open that section: ${error.message}`);
  }
}

document.querySelectorAll('[data-section]').forEach(button => {
  button.addEventListener('click', () => openSection(button.dataset.section));
});

document.querySelectorAll('[data-action="home"]').forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

document.querySelectorAll('[data-mood]').forEach(button => {
  button.addEventListener('click', async () => {
    button.disabled = true;
    try {
      fanState = await appApi.setMood(button.dataset.mood);
      renderMood(fanState.mood);
      showStatus(appStatus, 'Mood saved on this computer.');
    } catch (error) {
      showStatus(appStatus, `Could not save your mood: ${error.message}`);
    } finally {
      button.disabled = false;
    }
  });
});

noteInput.addEventListener('input', () => {
  noteCount.textContent = `${noteInput.value.length} / 600`;
});

noteForm.addEventListener('submit', async event => {
  event.preventDefault();
  saveNoteButton.disabled = true;
  showStatus(formStatus, '');
  try {
    fanState = await appApi.saveNote(noteInput.value);
    noteInput.value = '';
    noteCount.textContent = '0 / 600';
    renderNotes(fanState.notes);
    showStatus(formStatus, 'Saved. This one stays on your computer.');
  } catch (error) {
    showStatus(formStatus, `Could not save that note: ${error.message}`);
  } finally {
    saveNoteButton.disabled = false;
  }
});

notesList.addEventListener('click', async event => {
  const remove = event.target.closest('[data-delete-note]');
  if (!remove) return;
  remove.disabled = true;
  showStatus(appStatus, '');
  try {
    fanState = await appApi.deleteNote(remove.dataset.deleteNote);
    renderNotes(fanState.notes);
  } catch (error) {
    remove.disabled = false;
    showStatus(appStatus, `Could not remove that note: ${error.message}`);
  }
});

function updateDate() {
  document.querySelector('#todayDate').textContent = new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(new Date()).toUpperCase();
}

updateDate();
window.setInterval(updateDate, 60_000);
loadFanState();
