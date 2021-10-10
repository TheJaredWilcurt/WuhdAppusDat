nw.Window.get().showDevTools();

const {
  loadSettings,
  saveSettings
} = require('./scripts/settings.js');
const {
  APP_TITLE,
  DEFAULT_BACKGROUND,
  DEFAULT_BACKGROUND_BRIGHTNESS,
  DEFAULT_BACKGROUND_CONTRAST,
  DEFAULT_BACKGROUND_HUE_ROTATE,
  DEFAULT_BACKGROUND_SATURATION,
  DEFAULT_ALWAYS_ON_TOP,
  DEFAULT_CLOSING_APP,
  DEFAULT_VISIBLE_ON_ALL_WORKSPACES,
  DEFAULT_SYSTEM_TRAY,
  DEFAULT_TEXT_COLOR,
  DEFAULT_TEXT_SHADOW,
  DEFAULT_FONT,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_FONT_STYLE,
  DEFAULT_TEXT_POSITION,
  DEFAULT_INTERVAL,
  MAX_CONTRAST,
  MAX_BRIGHTNESS,
  MAX_SATURATION
} = require('./scripts/global-constants.js');

const settings = loadSettings();

document.querySelector('title').innerText = APP_TITLE + ' Options';
document.getElementById('app-title').innerText = APP_TITLE;
document.getElementById('app-version').innerText = nw.App.manifest.version;

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
const closingAppInput = document.getElementById('closing-app-input');
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
const textPositionInput = document.getElementById('text-position-input');
const fauxTextPosition = document.getElementById('faux-text-position');
const clearTextPosition = document.getElementById('clear-text-position');
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

function calculateSliderValue (DEFAULT_VALUE, setting, MAX) {
  let value = DEFAULT_VALUE;
  if (typeof(setting) === 'number') {
    value = setting;
  }
  value = Math.round(value / MAX * 100);
  return value;
}

function updateDOMCheckbox (el, setting, DEFAULT_VALUE) {
  let value = DEFAULT_VALUE;
  if (typeof(settings[setting]) === 'boolean') {
    value = settings[setting];
  }
  el.checked = value;
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
  updateDOMCheckbox(alwaysOnTopInput, 'alwaysOnTop', DEFAULT_ALWAYS_ON_TOP);
  updateDOMCheckbox(visibleOnAllWorkspacesInput, 'visibleOnAllWorkspaces', DEFAULT_VISIBLE_ON_ALL_WORKSPACES);
  updateDOMCheckbox(systemTrayInput, 'systemTray', DEFAULT_SYSTEM_TRAY);
  closingAppInput.value = settings.closingApp || DEFAULT_CLOSING_APP;
  if (settings.systemTray) {
    closingAppInput.parentElement.classList.remove('disabled');
    closingAppInput.removeAttribute('disabled');
  } else {
    closingAppInput.parentElement.classList.add('disabled');
    closingAppInput.setAttribute('disabled', 'disabled');
  }
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
  updateDOMCheckbox(fontStyleInput, 'fontStyle', DEFAULT_FONT_STYLE);
  fontWeightInput.value = (settings.fontWeight || DEFAULT_FONT_WEIGHT) / 100;
  fauxFontWeight.innerText = (settings.fontWeight || DEFAULT_FONT_WEIGHT) / 100;
  textPositionInput.value = (settings.textPosition || DEFAULT_TEXT_POSITION) + 400;
  fauxTextPosition.innerText = (settings.textPosition || DEFAULT_TEXT_POSITION) + 400;
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
  const tabBindings = [
    {
      el: optionsTab,
      name: 'options'
    },
    {
      el: textTab,
      name: 'text'
    },
    {
      el: backgroundTab,
      name: 'background'
    },
    {
      el: aboutTab,
      name: 'about'
    }
  ];
  tabBindings.forEach(function (tab) {
    tab.el.addEventListener('click', function (evt) {
      evt.preventDefault();
      settings.lastViewedSection = tab.name;
      saveAndUpdateDOM();
    });
  });

  // type="file"
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
  fauxBackgroundInput.addEventListener('click', function () {
    backgroundImageInput.click();
  });

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
      saveAndUpdateDOM();
    });
  });

  // Background filters
  backgroundHueInput.addEventListener('input', function (evt) {
    let value = parseInt(evt.currentTarget.value);
    settings.backgroundHueRotate = value;
    saveAndUpdateDOM();
  });
  backgroundBrightnessInput.addEventListener('input', function (evt) {
    settings.backgroundBrightness = convertSettingToPercent(evt.currentTarget.value, MAX_BRIGHTNESS);
    saveAndUpdateDOM();
  });
  backgroundContrastInput.addEventListener('input', function (evt) {
    settings.backgroundContrast = convertSettingToPercent(evt.currentTarget.value, MAX_CONTRAST);
    saveAndUpdateDOM();
  });
  backgroundSaturationInput.addEventListener('input', function (evt) {
    settings.backgroundSaturation = convertSettingToPercent(evt.currentTarget.value, MAX_SATURATION);
    saveAndUpdateDOM();
  });

  const clearBackgroundFilters = [
    {
      clearEl: clearBackgroundHue,
      setting: 'backgroundHueRotate',
      default: DEFAULT_BACKGROUND_HUE_ROTATE
    },
    {
      clearEl: clearBackgroundBrightness,
      setting: 'backgroundBrightness',
      default: DEFAULT_BACKGROUND_BRIGHTNESS
    },
    {
      clearEl: clearBackgroundContrast,
      setting: 'backgroundContrast',
      default: DEFAULT_BACKGROUND_CONTRAST
    },
    {
      clearEl: clearBackgroundSaturation,
      setting: 'backgroundSaturation',
      default: DEFAULT_BACKGROUND_SATURATION
    }
  ];
  clearBackgroundFilters.forEach(function (filter) {
    filter.clearEl.addEventListener('click', function (evt) {
      evt.preventDefault();
      settings[filter.setting] = filter.default;
      saveAndUpdateDOM();
    });
  });

  // type="checkbox"
  const checkboxes = [
    {
      el: alwaysOnTopInput,
      setting: 'alwaysOnTop',
      faux: fauxAlwaysOnTop
    },
    {
      el: visibleOnAllWorkspacesInput,
      setting: 'visibleOnAllWorkspaces',
      faux: fauxVisibleOnAllWorkspaces
    },
    {
      el: fontStyleInput,
      setting: 'fontStyle',
      faux: fauxFontStyle
    }
  ];
  checkboxes.forEach(function (checkbox) {
    checkbox.el.addEventListener('click', function (evt) {
      evt.stopPropagation();
      const value = evt.currentTarget.checked;
      settings[checkbox.setting] = value;
      saveAndUpdateDOM();
    });
    checkbox.faux.addEventListener('click', function (evt) {
      evt.stopPropagation();
      checkbox.el.click();
    });
  });

  systemTrayInput.addEventListener('click', function (evt) {
    evt.stopPropagation();
    const value = evt.currentTarget.checked;
    settings.systemTray = value;
    if (!value) {
      settings.closingApp = 'exit';
    }
    saveAndUpdateDOM();
  });
  fauxSystemTray.addEventListener('click', function (evt) {
    evt.stopPropagation();
    systemTrayInput.click();
  });
  fauxAlwaysOnTop.addEventListener('click', function (evt) {
    evt.stopPropagation();
    alwaysOnTopInput.click();
  });

  // type="color"
  textColorInput.addEventListener('input', function (evt) {
    let color = (
      evt &&
      evt.currentTarget &&
      evt.currentTarget.value
    ) || '';
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

  // select option
  closingAppInput.addEventListener('input', function (evt) {
    const value = evt.currentTarget.value;
    settings.closingApp = value;
    saveAndUpdateDOM();
  });
  textShadowInput.addEventListener('input', function (evt) {
    const value = evt.currentTarget.value;
    settings.textShadow = value;
    saveAndUpdateDOM();
  });
  // type="text"
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
  // type="range"
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
  textPositionInput.addEventListener('input', function (evt) {
    let value = parseInt(evt.currentTarget.value);
    settings.textPosition = value - 400;
    saveAndUpdateDOM();
  });
  clearTextPosition.addEventListener('click', function (evt) {
    evt.preventDefault();
    settings.textPosition = DEFAULT_TEXT_POSITION;
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
    button.addEventListener('click', function () {
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
