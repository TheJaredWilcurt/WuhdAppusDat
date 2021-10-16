// nw.Window.get().showDevTools();

const fs = require('fs');


const loadSettings = require('./scripts/settings.js').loadSettings;
const {
  APP_TITLE,
  DEFAULT_BACKGROUND_IMAGE,
  DEFAULT_INTERVAL,
  DEFAULT_VISIBLE_ON_ALL_WORKSPACES
} = require('./scripts/global-constants.js');

document.querySelector('title').innerText = APP_TITLE;

const appName = document.getElementById('app-name');
const background = document.getElementById('background');
let interval;
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

  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(setAppName, (settings.interval || DEFAULT_INTERVAL));

  let alwaysOnTopValidated;
  if (typeof(settings.alwaysOnTop) === 'boolean') {
    alwaysOnTopValidated = settings.alwaysOnTop;
  } else {

  }


  nw.Window.get().setAlwaysOnTop(alwaysOnTopValidated);



  let visibleOnAllWorkspacesValidated;


  if (typeof(settings.visibleOnAllWorkspaces) === 'boolean') {
    visibleOnAllWorkspacesValidated = settings.visibleOnAllWorkspaces;

  } else {
    visibleOnAllWorkspacesValidated = DEFAULT_VISIBLE_ON_ALL_WORKSPACES;
  }
  nw.Window.get().setVisibleOnAllWorkspaces(visibleOnAllWorkspacesValidated);

  // Background image
  let backgroundImage = (settings && settings.background) || DEFAULT_BACKGROUND_IMAGE;

  if (
    settings &&
    settings.background &&
    settings.background !== 'images/leaves.png' &&
    settings.background !== 'images/spikes.png' &&
    settings.background !== 'images/bubbles.png'
  ) {
    backgroundImage = 'file://' + backgroundImage.split('\\').join('/');
  }
  background.style.backgroundImage = 'url("' + backgroundImage + '")';

  let brightness;
  let contrast;
  let hueRotate;
  let saturation;
  if (typeof(settings.backgroundBrightness) === 'number') {
    brightness = 'brightness(' + settings.backgroundBrightness + ')';
  }
  if (typeof(settings.backgroundContrast) === 'number') {
    contrast = 'contrast(' + settings.backgroundContrast + ')';
  }
  if (typeof(settings.backgroundHueRotate) === 'number') {
    hueRotate = 'hue-rotate(' + settings.backgroundHueRotate + 'deg)';
  }
  if (typeof(settings.backgroundSaturation) === 'number') {
    saturation = 'saturate(' + settings.backgroundSaturation + ')';
  }
  let filters = [
    brightness,
    contrast,
    hueRotate,
    saturation
  ].filter(Boolean).join(' ');
  background.style.filter = filters || 'none';
}

function initialize () {
  global.refreshParent = function () {
    // applySettings();
  };

  // applySettings();
}

initialize();
