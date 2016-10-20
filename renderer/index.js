'use strict';

const Rx = require('rxjs/RX');

const apiStream = Rx.Observable.fromPromise(
  fetch('https://api.github.com/users/sassy/repos')
).flatMap((response) => {
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
