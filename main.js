'use strict';

const {app, BrowserWindow} = require('electron');
const Rx = require('rxjs/RX');

const winStream = Rx.Observable.fromEvent(app, 'ready')
  .map(() => {
    console.log('ready');
    return new BrowserWindow({width: 800, height: 600});
  });

winStream.subscribe((win) => {
  win.loadURL(`file://${__dirname}/index.html`);
});

Rx.Observable.fromEvent(app, 'windo-all-closed')
  .subscribe(() => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
