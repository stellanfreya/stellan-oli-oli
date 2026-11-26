const fs = require('node:fs/promises');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron');

const siteUrl = 'https://stellanfreya.github.io/stellan-oli-oli/';
const siteOrigin = new URL(siteUrl).origin;
const sitePath = new URL(siteUrl).pathname;
const appId = 'com.stellanfreya.stellanolioli';
const fanStatePath = path.join(app.getPath('userData'), 'fan-desk.json');
const moods = new Set(['electric', 'tender', 'chaotic', 'dreamy']);
const siteSections = new Map([
  ['albums', 'albums'],
  ['photos', 'photos'],
  ['oliclips', 'oliclipsTitle'],
  ['community', 'community'],
  ['fanclub', 'fanclub'],
  ['tour', 'events']
]);

let homeWindow;
let siteWindow;
let stateWrite = Promise.resolve();

app.setName('Stellan Oli Oli');
app.setAppUserModelId(appId);
Menu.setApplicationMenu(null);

function isAppUrl(value) {
  try {
    const url = new URL(value);
    return url.origin === siteOrigin
      && (url.pathname === sitePath.slice(0, -1) || url.pathname.startsWith(sitePath));
  } catch {
    return false;
  }
}

function openExternalUrl(value) {
  try {
    const url = new URL(value);
    if (['https:', 'http:', 'mailto:'].includes(url.protocol)) {
      void shell.openExternal(url.toString()).catch(error => {
        console.error('Could not open external link.', error);
      });
    }
  } catch {
    console.error('Blocked an invalid external link.');
  }
}

function assertHomeWindow(event) {
  if (!homeWindow || event.sender !== homeWindow.webContents) {
    throw new Error('This action is only available from the fan desk.');
  }
}

async function readFanState() {
  let contents;
  try {
    contents = await fs.readFile(fanStatePath, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return { mood: 'dreamy', notes: [] };
    throw error;
  }

  const state = JSON.parse(contents);
  if (!state || typeof state !== 'object' || Array.isArray(state)
      || !moods.has(state.mood) || !Array.isArray(state.notes) || state.notes.length > 30
      || state.notes.some(note => !note || typeof note.id !== 'string'
        || typeof note.text !== 'string' || note.text.length > 600
        || typeof note.createdAt !== 'string')) {
    throw new Error('Your saved fan desk data is not in the expected format.');
  }
  return state;
}

async function writeFanState(state) {
  await fs.mkdir(path.dirname(fanStatePath), { recursive: true });
  const temporaryPath = `${fanStatePath}.tmp`;
  await fs.writeFile(temporaryPath, JSON.stringify(state, null, 2), 'utf8');
  await fs.rename(temporaryPath, fanStatePath);
}

function updateFanState(update) {
  const operation = stateWrite.then(async () => {
    const nextState = update(await readFanState());
    await writeFanState(nextState);
    return nextState;
  });
  stateWrite = operation.catch(() => {});
  return operation;
}

function createSiteWindow(section) {
  const target = new URL(siteUrl);
  const anchor = siteSections.get(section);
  if (anchor) target.hash = anchor;

  if (siteWindow && !siteWindow.isDestroyed()) {
    siteWindow.show();
    siteWindow.focus();
    if (siteWindow.webContents.getURL() !== target.href) {
      siteWindow.loadURL(target.href).catch(error => {
        console.error('Could not open the fan site section.', error);
      });
    }
    return;
  }

  siteWindow = new BrowserWindow({
    width: 1360,
    height: 900,
    minWidth: 800,
    minHeight: 640,
    parent: homeWindow,
    show: false,
    title: 'Stellan Oli Oli',
    backgroundColor: '#f5f4f1',
    icon: path.join(__dirname, '..', 'app-icon.ico'),
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  siteWindow.once('ready-to-show', () => siteWindow?.show());
  siteWindow.on('closed', () => {
    siteWindow = null;
  });
  siteWindow.webContents.setWindowOpenHandler(({ url }) => {
    openExternalUrl(url);
    return { action: 'deny' };
  });
  siteWindow.webContents.on('will-navigate', (event, url) => {
    if (!isAppUrl(url)) {
      event.preventDefault();
      openExternalUrl(url);
    }
  });
  siteWindow.webContents.on('will-redirect', (event, url) => {
    if (!isAppUrl(url)) {
      event.preventDefault();
      openExternalUrl(url);
    }
  });
  siteWindow.webContents.on('page-title-updated', (event, title) => {
    event.preventDefault();
    siteWindow?.setTitle(title);
  });
  siteWindow.loadURL(target.href).catch(() => {
    if (!siteWindow || siteWindow.isDestroyed()) return;
    siteWindow.loadFile(path.join(__dirname, 'offline.html')).catch(error => {
      console.error('Could not show the offline screen.', error);
      siteWindow?.destroy();
    });
  });
}

ipcMain.handle('desktop:open-section', (event, section) => {
  assertHomeWindow(event);
  if (typeof section !== 'string' || (section !== 'home' && !siteSections.has(section))) {
    throw new Error('That fan site section is not available.');
  }
  createSiteWindow(section);
});

ipcMain.handle('desktop:get-fan-state', event => {
  assertHomeWindow(event);
  return readFanState();
});

ipcMain.handle('desktop:set-mood', (event, mood) => {
  assertHomeWindow(event);
  if (!moods.has(mood)) throw new Error('Choose one of the moods shown on the fan desk.');
  return updateFanState(state => ({ ...state, mood }));
});

ipcMain.handle('desktop:save-note', (event, text) => {
  assertHomeWindow(event);
  if (typeof text !== 'string' || !text.trim() || text.trim().length > 600) {
    throw new Error('Write a note of 1–600 characters before saving.');
  }
  return updateFanState(state => ({
    ...state,
    notes: [{ id: randomUUID(), text: text.trim(), createdAt: new Date().toISOString() }, ...state.notes].slice(0, 30)
  }));
});

ipcMain.handle('desktop:delete-note', (event, id) => {
  assertHomeWindow(event);
  if (typeof id !== 'string' || !id) throw new Error('Choose a note to remove.');
  return updateFanState(state => {
    const notes = state.notes.filter(note => note.id !== id);
    if (notes.length === state.notes.length) throw new Error('That note is no longer on your fan desk.');
    return { ...state, notes };
  });
});

function createHomeWindow() {
  homeWindow = new BrowserWindow({
    width: 1440,
    height: 980,
    minWidth: 760,
    minHeight: 680,
    show: false,
    title: 'Stellan Oli Oli — Fan Desk',
    backgroundColor: '#17151b',
    icon: path.join(__dirname, '..', 'app-icon.ico'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  homeWindow.once('ready-to-show', () => homeWindow?.show());
  homeWindow.on('closed', () => {
    homeWindow = null;
  });
  homeWindow.webContents.setWindowOpenHandler(({ url }) => {
    openExternalUrl(url);
    return { action: 'deny' };
  });
  homeWindow.webContents.on('will-navigate', event => event.preventDefault());
  homeWindow.loadFile(path.join(__dirname, 'home.html')).catch(error => {
    console.error('Could not open the fan desk.', error);
    homeWindow?.destroy();
  });
}

const hasSingleInstanceLock = app.requestSingleInstanceLock();
if (!hasSingleInstanceLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (homeWindow && !homeWindow.isDestroyed()) {
      if (homeWindow.isMinimized()) homeWindow.restore();
      homeWindow.focus();
    }
  });
  app.whenReady().then(createHomeWindow);
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createHomeWindow();
  });
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}
