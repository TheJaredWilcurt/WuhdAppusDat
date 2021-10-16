nw.Window.get().showDevTools();

const { APP_TITLE } = require('./scripts/global-constants.js');

document.querySelector('title').innerText = APP_TITLE + ' Options';
document.getElementById('app-title').innerText = APP_TITLE;

function addClass (el, className) {
  document.querySelector(el).classList.add(className);
}

function initialize () {
  if (process.platform === 'darwin') {
    addClass('body', 'osx');
  }
}

initialize();
