document.querySelector('title').innerText = APP_TITLE;
const getActiveProcessName = require('windows-active-process').getActiveProcessName;
const appName = document.getElementById('app-name');
const background = document.getElementById('background');
let interval;

function applySettings () {
  const settings = loadSettings();

  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(setAppName, (settings.interval || DEFAULT_INTERVAL));

  let alwaysOnTopValidated = typeof(settings.alwaysOnTop) === 'boolean' && settings.alwaysOnTop;
  let alwaysOnTopDefault = typeof(settings.alwaysOnTop) !== 'boolean' && DEFAULT_ALWAYS_ON_TOP;
  nw.Window.get().setAlwaysOnTop(alwaysOnTopValidated || alwaysOnTopDefault);

  // Background image
  let backgroundImage = settings?.background || DEFAULT_BACKGROUND;
  if (
    settings?.background &&
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
    nw.Window.get().close(true);
  });

  let optionsIcon = document.getElementById('window-control-options');
  optionsIcon.addEventListener('click', function () {
    global.optionsWindow.show();
  });
}

function setAppName () {
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
  fileName = fileName.split('_').join(' ');
  fileName = commonApplications[fileName.toLowerCase()] || fileName;

  appName.innerText = fileName;
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
