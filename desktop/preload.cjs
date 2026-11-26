const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('stellanApp', Object.freeze({
  openSection: section => ipcRenderer.invoke('desktop:open-section', section),
  getFanState: () => ipcRenderer.invoke('desktop:get-fan-state'),
  setMood: mood => ipcRenderer.invoke('desktop:set-mood', mood),
  saveNote: text => ipcRenderer.invoke('desktop:save-note', text),
  deleteNote: id => ipcRenderer.invoke('desktop:delete-note', id)
}));
