const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('stellanApp', Object.freeze({
  openSection: section => ipcRenderer.invoke('desktop:open-section', section),
  openExternal: url => ipcRenderer.invoke('desktop:open-external', url),
  getAppVersion: () => ipcRenderer.invoke('desktop:get-app-version'),
  getFanState: () => ipcRenderer.invoke('desktop:get-fan-state'),
  setMood: mood => ipcRenderer.invoke('desktop:set-mood', mood),
  setPreferences: preferences => ipcRenderer.invoke('desktop:set-preferences', preferences),
  saveNote: text => ipcRenderer.invoke('desktop:save-note', text),
  deleteNote: id => ipcRenderer.invoke('desktop:delete-note', id)
}));
