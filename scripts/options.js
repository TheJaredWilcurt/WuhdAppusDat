document.querySelector('title').innerText = APP_TITLE + ' Options';
document.getElementById('app-title').innerText = APP_TITLE;
document.getElementById('app-version').innerText = nw.App.manifest.version;
const settings = loadSettings();

const optionsTab = document.getElementById('options-tab');
const textTab = document.getElementById('text-tab');
const backgroundTab = document.getElementById('background-tab');
const aboutTab = document.getElementById('about-tab');

const clearBackground = document.getElementById('clear-background');
const currentBackgroundImage = document.getElementById('current-background-image');
const backgroundImageInput = document.getElementById('background-image-input');
const backgroundLeaves = document.getElementById('background-leaves');
const backgroundSpikes = document.getElementById('background-spikes');
const backgroundBubbles = document.getElementById('background-bubbles');
const backgroundHueInput = document.getElementById('background-hue-input');
const fauxBackgroundHue = document.getElementById('faux-background-hue');
const clearBackgroundHue = document.getElementById('clear-background-hue');
const backgroundBrightnessInput = document.getElementById('background-brightness-input');
const fauxBackgroundBrightness = document.getElementById('faux-background-brightness');
const clearBackgroundBrightness = document.getElementById('clear-background-brightness');
const backgroundContrastInput = document.getElementById('background-contrast-input');
const fauxBackgroundContrast = document.getElementById('faux-background-contrast');
const clearBackgroundContrast = document.getElementById('clear-background-contrast');
const backgroundSaturationInput = document.getElementById('background-saturation-input');
const fauxBackgroundSaturation = document.getElementById('faux-background-saturation');
const clearBackgroundSaturation = document.getElementById('clear-background-saturation');
const alwaysOnTopInput = document.getElementById('always-on-top-input');
const fauxAlwaysOnTop = document.getElementById('faux-always-on-top');
const visibleOnAllWorkspacesInput = document.getElementById('visible-on-all-workspaces-input');
const fauxVisibleOnAllWorkspaces = document.getElementById('faux-visible-on-all-workspaces');
const systemTrayInput = document.getElementById('system-tray-input');
const fauxSystemTray = document.getElementById('faux-system-tray');
const clearTextColor = document.getElementById('clear-text-color');
const textColorInput = document.getElementById('text-color-input');
const fauxBackgroundInput = document.getElementById('faux-background-input');
const fauxTextColor = document.getElementById('faux-text-color');
const textShadowInput = document.getElementById('text-shadow-input');
const fontInput = document.getElementById('font-input');
const clearFont = document.getElementById('clear-font');
const fontSizeInput = document.getElementById('font-size-input');
const fauxFontSize = document.getElementById('faux-font-size');
const clearFontSize = document.getElementById('clear-font-size');
const fauxFontStyle = document.getElementById('faux-font-style');
const fontStyleInput = document.getElementById('font-style-input');
const fontWeightInput = document.getElementById('font-weight-input');
const fauxFontWeight = document.getElementById('faux-font-weight');
const clearFontWeight = document.getElementById('clear-font-weight');
const updateIntervalInput = document.getElementById('update-interval-input');
const fauxUpdateInterval = document.getElementById('faux-update-interval');
const clearUpdateInterval = document.getElementById('clear-update-interval');

function addClass (el, className) {
  document.querySelector(el).classList.add(className);
}
function removeClass (el, className) {
  document.querySelector(el).classList.remove(className);
}
function hide (el) {
  addClass(el, 'hidden');
}
function show (el) {
  removeClass(el, 'hidden');
}

function saveSettings (settings) {
  const data = JSON.stringify(settings, null, 2);
  try {
    fs.writeFileSync(settingsLocation, data);
  } catch (err) {
    console.log('Error saving settings', err);
  }
  global.refreshParent();
}

function calculateSliderValue (DEFAULT_VALUE, setting, MAX) {
  let value = DEFAULT_VALUE;
  if (typeof(setting) === 'number') {
    value = setting;
  }
  value = Math.round(value / MAX * 100);
  return value;
}

function updateDOM () {
  toggleSection();
  currentBackgroundImage.innerText = settings.background || DEFAULT_BACKGROUND;
  fauxBackgroundInput.setAttribute('title', (settings.background || DEFAULT_BACKGROUND));
  backgroundHueInput.value = settings.backgroundHueRotate || DEFAULT_BACKGROUND_HUE_ROTATE;
  fauxBackgroundHue.innerText = settings.backgroundHueRotate || DEFAULT_BACKGROUND_HUE_ROTATE;
  let brightness = calculateSliderValue(DEFAULT_BACKGROUND_BRIGHTNESS, settings.backgroundBrightness, MAX_BRIGHTNESS);
  backgroundBrightnessInput.value = brightness;
  fauxBackgroundBrightness.innerText = brightness;
  let contrast = calculateSliderValue(DEFAULT_BACKGROUND_CONTRAST, settings.backgroundContrast, MAX_CONTRAST);
  backgroundContrastInput.value = contrast;
  fauxBackgroundContrast.innerText = contrast;
  let saturation = calculateSliderValue(DEFAULT_BACKGROUND_SATURATION, settings.backgroundSaturation, MAX_SATURATION);
  backgroundSaturationInput.value = saturation;
  fauxBackgroundSaturation.innerText = saturation;
  alwaysOnTopInput.checked = settings.alwaysOnTop || DEFAULT_ALWAYS_ON_TOP;
  visibleOnAllWorkspacesInput.checked = settings.visibleOnAllWorkspaces || DEFAULT_VISIBLE_ON_ALL_WORKSPACES;
  systemTrayInput.checked = settings.systemTray || DEFAULT_SYSTEM_TRAY;
  fauxTextColor.style.background = settings.textColor || DEFAULT_TEXT_COLOR;
  textColorInput.value = settings.textColor || DEFAULT_TEXT_COLOR;
  textShadowInput.value = settings.textShadow || DEFAULT_TEXT_SHADOW;
  let font = DEFAULT_FONT;
  if (typeof(settings.font) === 'string') {
    font = settings.font;
  }
  fontInput.value = font;
  fontSizeInput.value = settings.fontSize || DEFAULT_FONT_SIZE;
  fauxFontSize.innerText = settings.fontSize || DEFAULT_FONT_SIZE;
  fontStyleInput.checked = settings.fontStyle || DEFAULT_FONT_STYLE;
  fontWeightInput.value = (settings.fontWeight || DEFAULT_FONT_WEIGHT) / 100;
  fauxFontWeight.innerText = (settings.fontWeight || DEFAULT_FONT_WEIGHT) / 100;
  updateIntervalInput.value = (settings.interval || DEFAULT_INTERVAL) / 1000;
  fauxUpdateInterval.innerText = (settings.interval || DEFAULT_INTERVAL) / 1000;
}

function saveAndUpdateDOM () {
  saveSettings(settings);
  updateDOM();
}

function convertSettingToPercent (value, MAX) {
  value = parseInt(value);
  if (value !== 0) {
    value = Math.round(MAX * value) / 100;
  }
  return value;
}


function toggleSection () {
  let current = settings.lastViewedSection || 'options';
  removeClass('#options-tab', 'active');
  removeClass('#text-tab', 'active');
  removeClass('#background-tab', 'active');
  removeClass('#about-tab', 'active');
  hide('#options-container');
  hide('#text-container');
  hide('#background-container');
  hide('#about-container');
  addClass('#' + current + '-tab', 'active');
  show('#' + current + '-container');
}
function eventBindings () {
  optionsTab.addEventListener('click', function (evt) {
    evt.preventDefault();
    settings.lastViewedSection = 'options';
    saveAndUpdateDOM();
  });
  textTab.addEventListener('click', function (evt) {
    evt.preventDefault();
    settings.lastViewedSection = 'text';
    saveAndUpdateDOM();
  });
  backgroundTab.addEventListener('click', function (evt) {
    evt.preventDefault();
    settings.lastViewedSection = 'background';
    saveAndUpdateDOM();
  });
  aboutTab.addEventListener('click', function (evt) {
    evt.preventDefault();
    settings.lastViewedSection = 'about';
    saveAndUpdateDOM();
  });
  clearBackground.addEventListener('click', function (evt) {
    evt.preventDefault();
    backgroundImageInput.value = '';
    settings.background = 'none.png';
    saveAndUpdateDOM();
  });
  backgroundImageInput.addEventListener('input', function (evt) {
    let file = (
      evt &&
      evt.currentTarget &&
      evt.currentTarget.files &&
      evt.currentTarget.files[0] &&
      evt.currentTarget.files[0].path
    );
    settings.background = file;
    saveAndUpdateDOM();
  });
  backgroundLeaves.addEventListener('click', function (evt) {
    settings.background = 'leaves.png';
    saveAndUpdateDOM();
  });
  backgroundSpikes.addEventListener('click', function (evt) {
    settings.background = 'spikes.png';
    saveAndUpdateDOM();
  });
  backgroundBubbles.addEventListener('click', function (evt) {
    settings.background = 'bubbles.png';
    saveAndUpdateDOM();
  });
  backgroundHueInput.addEventListener('input', function (evt) {
    let value = parseInt(evt.currentTarget.value);
    settings.backgroundHueRotate = value;
    saveAndUpdateDOM();
  });
  clearBackgroundHue.addEventListener('click', function (evt) {
    evt.preventDefault();
    settings.backgroundHueRotate = DEFAULT_BACKGROUND_HUE_ROTATE;
    saveAndUpdateDOM();
  });
  backgroundBrightnessInput.addEventListener('input', function (evt) {
    settings.backgroundBrightness = convertSettingToPercent(evt.currentTarget.value, MAX_BRIGHTNESS);
    saveAndUpdateDOM();
  });
  clearBackgroundBrightness.addEventListener('click', function (evt) {
    evt.preventDefault();
    settings.backgroundBrightness = DEFAULT_BACKGROUND_BRIGHTNESS;
    saveAndUpdateDOM();
  });
  backgroundContrastInput.addEventListener('input', function (evt) {
    settings.backgroundContrast = convertSettingToPercent(evt.currentTarget.value, MAX_CONTRAST);
    saveAndUpdateDOM();
  });
  clearBackgroundContrast.addEventListener('click', function (evt) {
    evt.preventDefault();
    settings.backgroundContrast = DEFAULT_BACKGROUND_CONTRAST;
    saveAndUpdateDOM();
  });
  backgroundSaturationInput.addEventListener('input', function (evt) {
    settings.backgroundSaturation = convertSettingToPercent(evt.currentTarget.value, MAX_SATURATION);
    saveAndUpdateDOM();
  });
  clearBackgroundSaturation.addEventListener('click', function (evt) {
    evt.preventDefault();
    settings.backgroundSaturation = DEFAULT_BACKGROUND_SATURATION;
    saveAndUpdateDOM();
  });
  alwaysOnTopInput.addEventListener('click', function (evt) {
    evt.stopPropagation();
    const value = evt.currentTarget.checked;
    settings.alwaysOnTop = value;
    saveAndUpdateDOM();
  });
  fauxAlwaysOnTop.addEventListener('click', function (evt) {
    evt.stopPropagation();
    alwaysOnTopInput.click();
  });
  visibleOnAllWorkspacesInput.addEventListener('click', function (evt) {
    evt.stopPropagation();
    const value = evt.currentTarget.checked;
    settings.visibleOnAllWorkspaces = value;
    saveAndUpdateDOM();
  });
  fauxVisibleOnAllWorkspaces.addEventListener('click', function (evt) {
    evt.stopPropagation();
    visibleOnAllWorkspacesInput.click();
  });
  systemTrayInput.addEventListener('click', function (evt) {
    evt.stopPropagation();
    const value = evt.currentTarget.checked;
    settings.systemTray = value;
    saveAndUpdateDOM();
  });
  fauxSystemTray.addEventListener('click', function (evt) {
    evt.stopPropagation();
    systemTrayInput.click();
  });
  textColorInput.addEventListener('input', function (evt) {
    let color = evt && evt.currentTarget && evt.currentTarget.value;
    settings.textColor = color.toUpperCase();
    saveAndUpdateDOM();
  });
  clearTextColor.addEventListener('click', function (evt) {
    evt.preventDefault();
    settings.textColor = undefined;
    saveAndUpdateDOM();
  });
  fauxBackgroundInput.addEventListener('click', function () {
    backgroundImageInput.click();
  });
  fauxTextColor.addEventListener('click', function () {
    textColorInput.click();
  });
  textShadowInput.addEventListener('input', function (evt) {
    const value = evt.currentTarget.value;
    settings.textShadow = value;
    saveAndUpdateDOM();
  });
  fontInput.addEventListener('input', function (evt) {
    const value = evt.currentTarget.value;
    settings.font = value;
    saveAndUpdateDOM();
  });
  clearFont.addEventListener('click', function (evt) {
    evt.preventDefault();
    settings.font = DEFAULT_FONT;
    saveAndUpdateDOM();
  });
  fontSizeInput.addEventListener('input', function (evt) {
    let value = parseInt(evt.currentTarget.value);
    settings.fontSize = value;
    saveAndUpdateDOM();
  });
  clearFontSize.addEventListener('click', function (evt) {
    evt.preventDefault();
    settings.fontSize = DEFAULT_FONT_SIZE;
    saveAndUpdateDOM();
  });
  fontStyleInput.addEventListener('click', function (evt) {
    evt.stopPropagation();
    const value = evt.currentTarget.checked;
    settings.fontStyle = value;
    saveAndUpdateDOM();
  });
  fauxFontStyle.addEventListener('click', function (evt) {
    evt.stopPropagation();
    fontStyleInput.click();
  });
  fontWeightInput.addEventListener('input', function (evt) {
    let value = parseInt(evt.currentTarget.value);
    settings.fontWeight = value * 100;
    saveAndUpdateDOM();
  });
  clearFontWeight.addEventListener('click', function (evt) {
    evt.preventDefault();
    settings.fontWeight = DEFAULT_FONT_WEIGHT;
    saveAndUpdateDOM();
  });
  updateIntervalInput.addEventListener('input', function (evt) {
    let value = parseInt(evt.currentTarget.value);
    settings.interval = value * 1000;
    saveAndUpdateDOM();
  });
  clearUpdateInterval.addEventListener('click', function (evt) {
    evt.preventDefault();
    settings.interval = DEFAULT_INTERVAL;
    saveAndUpdateDOM();
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

function initializeWindowControls () {
  let controls = [
    { button: 'minimize', action: 'minimize' },
    { button: 'restore', action: 'restore' },
    { button: 'maximize', action: 'maximize' },
    { button: 'close', action: 'hide' }
  ];

  controls.forEach(function (control) {
    let button = document.getElementsByClassName('window-control-' + control.button)[0];
    button.addEventListener('click', function (evt) {
      nw.Window.get()[control.action]();
    });
  });

  nw.Window.get().on('maximize', function () {
    hide('.window-control-maximize');
    show('.window-control-restore');
    addClass('#main-content', 'border-radius-0');
  });

  nw.Window.get().on('restore', function () {
    hide('.window-control-restore');
    show('.window-control-maximize');
    removeClass('#main-content', 'border-radius-0');
  });
}

function initialize () {
  if (process.platform === 'darwin') {
    addClass('body', 'osx');
  }
  if (nw.Window.get().canSetVisibleOnAllWorkspaces()) {
    show('#visible-on-all-workspaces-container');
  }
  initializeWindowControls();
  eventBindings();
  updateDOM();
  externalLinks();
}

initialize();
