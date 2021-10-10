// nw.Window.get().showDevTools();

const fs = require('fs');
const path = require('path');

const loadSettings = require('./scripts/settings.js').loadSettings;
const {
  APP_TITLE,
  DEFAULT_BACKGROUND,
  DEFAULT_TEXT_COLOR,
  DEFAULT_FONT,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_FONT_STYLE,
  DEFAULT_TEXT_POSITION,
  DEFAULT_INTERVAL,
  DEFAULT_VISIBLE_ON_ALL_WORKSPACES
} = require('./scripts/global-constants.js');

loadSettings();
document.querySelector('title').innerText = APP_TITLE;

const appName = document.getElementById('app-name');
const background = document.getElementById('background');
let interval;

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
  let backgroundImage = (settings && settings.background) || DEFAULT_BACKGROUND;

  if (
    settings &&
    settings.background &&
    settings.background !== 'leaves.png' &&
    settings.background !== 'spikes.png' &&
    settings.background !== 'bubbles.png'
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

  // Text font/color
  appName.style.color = settings.textColor || DEFAULT_TEXT_COLOR;
  appName.style.fontFamily = settings.font || DEFAULT_FONT;
  appName.style.fontSize = (settings.fontSize || DEFAULT_FONT_SIZE) + 'px';
  appName.style.fontWeight = settings.fontWeight || DEFAULT_FONT_WEIGHT;
  appName.style.marginTop = (settings.textPosition || DEFAULT_TEXT_POSITION) + 'px';
  let fontStyle = 'normal';
  if (
    (typeof(settings.fontStyle) === 'boolean' && settings.fontStyle) ||
    (typeof(settings.fontStyle) !== 'boolean' && DEFAULT_FONT_STYLE)
  ) {
    fontStyle = 'italic'
  }
  appName.style.fontStyle = fontStyle;


  // Text Shadow
  if (settings.textShadow === 'none') {
    appName.style.textShadow = 'none';
  } else if (settings.textShadow === 'white') {
    appName.style.textShadow = '1px 1px 11px #FFF, 1px 1px 18px #FFF';
  } else {
    appName.style.textShadow = '1px 1px 11px #000, 1px 1px 18px #000';
  }
}

function eventBindings () {
  let closeIcon = document.getElementById('window-control-close');
  closeIcon.addEventListener('click', function () {
    const settings = loadSettings();
    if (global.tray && settings.closingApp === 'tray' && settings.systemTray) {
      nw.Window.get().hide();
    } else {
      if (global.tray) {
        global.removeTray();
      }
      nw.Window.get().close(true);
    }
  });

  let optionsIcon = document.getElementById('window-control-options');
  optionsIcon.addEventListener('click', function () {
    global.optionsWindow.show();
  });
}

function appNameCleanUp (fileName) {
  fileName = fileName.split('_').join(' ');
  if (fileName === atob('ZWxlY3Ryb24=')) {
    fileName = atob('RWxlY3Ryb20gKFVzaW5nIDk4JSBvZiBhdmFpbGFibGUgbWVtb3J5KQ==');
  } else {
    fileName = settings.appMap[fileName.toLowerCase()] || fileName;
  }
  return fileName || '';
}

async function setLinuxOrOSXAppName () {
  const activeWin = require('active-win');
  let win = await activeWin();
  let fileName = win && win.owner && win.owner.name;
  if (!fileName || typeof(fileName) !== 'string') {
    fileName = '';
  }
  appName.innerText = appNameCleanUp(fileName);
}

function setWindowsAppName () {
  const getActiveProcessName = require('windows-active-process').getActiveProcessName;
  let filePath = getActiveProcessName();
  if (!filePath || typeof(filePath) !== 'string') {
    filePath = '';
  }
  let splitPath = filePath.split(path.sep);
  let fileName = splitPath[splitPath.length - 1];
  fileName = fileName.split('.')

  if (fileName.length > 1) {
    fileName.pop();
  }
  fileName = fileName.join('');
  appName.innerText = appNameCleanUp(fileName);
}

function setAppName () {
  if (process.platform === 'win32') {
    setWindowsAppName();
  } else {
    setLinuxOrOSXAppName();
  }
}

function initialize () {
  global.refreshParent = function () {
    applySettings();
  };

  applySettings();
  eventBindings();
  setAppName();
}

initialize();
