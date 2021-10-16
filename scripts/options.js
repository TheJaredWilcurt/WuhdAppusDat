nw.Window.get().showDevTools();

const {
  loadSettings,
  saveSettings
} = require('./scripts/settings.js');
const { APP_TITLE } = require('./scripts/global-constants.js');

const settings = loadSettings();

document.querySelector('title').innerText = APP_TITLE + ' Options';
document.getElementById('app-title').innerText = APP_TITLE;

const backgroundLeaves = document.getElementById('background-leaves');
const backgroundSpikes = document.getElementById('background-spikes');
const backgroundBubbles = document.getElementById('background-bubbles');

function addClass (el, className) {
  document.querySelector(el).classList.add(className);
}

// used by background brightness, saturation, contrast
function convertSettingToPercent (value, MAX) {
  value = parseInt(value);
  if (value !== 0) {
    value = Math.round(MAX * value) / 100;
  }
  return value;
}

function eventBindings () {
  // Background images
  const backgroundImages = [
    {
      el: backgroundLeaves,
      file: 'images/leaves.png'
    },
    {
      el: backgroundSpikes,
      file: 'images/spikes.png'
    },
    {
      el: backgroundBubbles,
      file: 'images/bubbles.png'
    }
  ];
  backgroundImages.forEach(function (backgroundImage) {
    backgroundImage.el.addEventListener('click', function (evt) {
      evt.preventDefault();
      settings.background = backgroundImage.file;
      saveSettings(settings);
    });
  });
}

function externalLinks () {
  let links = document.getElementsByClassName('external');
  Array.from(links).forEach(function (link) {
    let url = link.attributes.href.value;
    link.setAttribute('title', url.replace('https://', '').replace('www.', ''));
    link.addEventListener('click', function (evt) {
      evt.preventDefault();
      nw.Shell.openExternal(url);
    });
  });
}


function initialize () {
  if (process.platform === 'darwin') {
    addClass('body', 'osx');
  }
  // eventBindings();
  // externalLinks();
}

initialize();
