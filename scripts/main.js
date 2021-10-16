// nw.Window.get().showDevTools();

const fs = require('fs');


const loadSettings = require('./scripts/settings.js').loadSettings;
const {
  APP_TITLE,
  DEFAULT_VISIBLE_ON_ALL_WORKSPACES
} = require('./scripts/global-constants.js');

document.querySelector('title').innerText = APP_TITLE;

let settings;

function applySettings () {
  // TODO: This should be handled from global state, not reading from disc
  settings = loadSettings();
  let appMap = {};
  const defaultAppMap = JSON.parse(fs.readFileSync('./app-map.json'));

  if (settings.appMap) {
    Object.keys(settings.appMap).forEach(function (key) {
      appMap[key.toLowerCase()] = settings.appMap[key];
    });
  }
  settings.appMap = appMap;
}

function initialize () {
  global.refreshParent = function () {
    // applySettings();
  };

  // applySettings();
}

initialize();
