'use strict';

const {app, BrowserWindow} = require('electron');
const Rx = require('rxjs/RX');

Rx.Observable.fromEvent(app, 'ready')
  .map(() => {
    return new BrowserWindow({width: 800, height: 600});
  }).subscribe((win) => {
    win.loadURL(`file://${__dirname}/index.html`);
    win.webContents.openDevTools();

    const closeSubscription = Rx.Observable.fromEvent(win, 'closed')
      .flatMap(() => {
        return Rx.Observable.fromEvent(app, 'activate');
      }).subscribe(() => {
        app.emit('ready');
        closeSubscription.unsubscribe();
      });
});

Rx.Observable.fromEvent(app, 'window-all-closed')
  .filter(() => {
    return process.platform !== 'darwin';
  }).subscribe(() => {
    app.quit();
  });
