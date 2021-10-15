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
  DEFAULT_TEXT_COLOR,
  DEFAULT_FONT,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_TEXT_POSITION,
  MAX_CONTRAST,
  MAX_BRIGHTNESS,
  MAX_SATURATION
} = require('./scripts/global-constants.js');

const settings = loadSettings();

document.querySelector('title').innerText = APP_TITLE + ' Options';
document.getElementById('app-title').innerText = APP_TITLE;

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
const clearTextColor = document.getElementById('clear-text-color');
const textColorInput = document.getElementById('text-color-input');
const fauxBackgroundInput = document.getElementById('faux-background-input');
const fauxTextColor = document.getElementById('faux-text-color');
const fontInput = document.getElementById('font-input');
const clearFont = document.getElementById('clear-font');
const fontWeightInput = document.getElementById('font-weight-input');
const fauxFontWeight = document.getElementById('faux-font-weight');
const clearFontWeight = document.getElementById('clear-font-weight');
const textPositionInput = document.getElementById('text-position-input');
const fauxTextPosition = document.getElementById('faux-text-position');
const clearTextPosition = document.getElementById('clear-text-position');

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

  fauxTextColor.style.background = settings.textColor || DEFAULT_TEXT_COLOR;
  textColorInput.value = settings.textColor || DEFAULT_TEXT_COLOR;
  let font = DEFAULT_FONT;
  if (typeof(settings.font) === 'string') {
    font = settings.font;
  }
  fontInput.value = font;
  fontWeightInput.value = (settings.fontWeight || DEFAULT_FONT_WEIGHT) / 100;
  fauxFontWeight.innerText = (settings.fontWeight || DEFAULT_FONT_WEIGHT) / 100;
  textPositionInput.value = (settings.textPosition || DEFAULT_TEXT_POSITION) + 400;
  fauxTextPosition.innerText = (settings.textPosition || DEFAULT_TEXT_POSITION) + 400;
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
  // updateDOM();
  // externalLinks();
}

initialize();
