const path = require('node:path');
const { app, BrowserWindow, Menu, shell } = require('electron');

const siteUrl = 'https://stellanfreya.github.io/stellan-oli-oli/';
const siteOrigin = new URL(siteUrl).origin;
const sitePath = new URL(siteUrl).pathname;
const appId = 'com.stellanfreya.stellanolioli';

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
    // Ignore malformed URLs rather than handing them to the operating system.
  }
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1360,
    height: 900,
    minWidth: 360,
    minHeight: 560,
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

  window.once('ready-to-show', () => window.show());
  window.webContents.setWindowOpenHandler(({ url }) => {
    openExternalUrl(url);
    return { action: 'deny' };
  });
  window.webContents.on('will-navigate', (event, url) => {
    if (!isAppUrl(url)) {
      event.preventDefault();
      openExternalUrl(url);
    }
  });
  window.webContents.on('will-redirect', (event, url) => {
    if (!isAppUrl(url)) {
      event.preventDefault();
      openExternalUrl(url);
    }
  });

  window.loadURL(siteUrl).catch(() => {
    if (!window.isDestroyed()) {
      window.loadFile(path.join(__dirname, 'offline.html')).catch(error => {
        console.error('Could not show the offline screen.', error);
        window.destroy();
      });
    }
  });
}

const hasSingleInstanceLock = app.requestSingleInstanceLock();
if (!hasSingleInstanceLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    const [window] = BrowserWindow.getAllWindows();
    if (window) {
      if (window.isMinimized()) window.restore();
      window.focus();
    }
  });
  app.whenReady().then(createWindow);
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}
