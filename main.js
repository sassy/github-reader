'use strict';

const {app, BrowserWindow} = require('electron');
const Rx = require('rxjs/RX');
const url = require('url');
const request = require('request');

Rx.Observable.fromEvent(app, 'ready')
  .map(() => {
    return new BrowserWindow({width: 800, height: 600});
  }).subscribe((win) => {
    win.loadURL(`file://${__dirname}/renderer/login.html`);
    //win.webContents.openDevTools();

    const closeSubscription = Rx.Observable.fromEvent(win, 'closed')
      .flatMap(() => {
        return Rx.Observable.fromEvent(app, 'activate');
      }).subscribe(() => {
        app.emit('ready');
        closeSubscription.unsubscribe();
      });
    Rx.Observable.fromEvent(win.webContents, 'did-get-redirect-request', (e, oldurl, newurl) => {
      const query = url.parse(newurl).query;
      return query;
    }).subscribe((query) => {
      const code = query.split('=')[1];
      request({
        url: 'https://github.com/login/oauth/access_token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        json:true,
        form: {
          "client_id" : "69b2af2069a4ef53c694",
          "client_secret" : "3b8a3a9958d4568f201971eb55ae85bdab5ea3bc",
          "code" : code
        }
      }, (error, response, body) => {
        win.loadURL(`file://${__dirname}/renderer/index.html?access_token=${ body.access_token }`);
      });
    });
    Rx.Observable.fromEvent(win.webContents, 'will-navigate', (e, navUrl) => {
      return navUrl;
    }).subscribe((navUrl) => {
      if (url.parse(navUrl).hostname === 'localhost') {
        const query = url.parse(navUrl).query;
        win.loadURL(`file://${__dirname}/renderer/index.html?${ query }`);
      } else {
        win.webContents.loadURL(navUrl);
      }
    });
});

Rx.Observable.fromEvent(app, 'window-all-closed')
  .filter(() => {
    return process.platform !== 'darwin';
  }).subscribe(() => {
    app.quit();
  });
