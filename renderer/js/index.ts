'use strict';

const Rx = require('rxjs/RX');

const access_token = location.search.split('=')[1];

const apiStream = Rx.Observable.fromPromise(
  fetch('https://api.github.com/user?access_token=' + access_token)
).flatMap((response) => {
  return response.json();
}).flatMap((json) => {
  return Rx.Observable.fromPromise(
    fetch('https://api.github.com/users/' + json.login + '/repos')
  );
}).flatMap((response) => {
  return response.json();
}).flatMap((array) => {
  return Rx.Observable.from(array);
});
apiStream.subscribe((data) => {
  console.log(data.name);
  const item = document.createElement('li');
  const text = document.createTextNode(data.name);
  item.appendChild(text);
  document.getElementById('list').appendChild(item);
}, (err) => {
  console.log(err);
});
