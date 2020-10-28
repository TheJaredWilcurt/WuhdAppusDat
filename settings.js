const fs = require('fs');
const path = require('path');
const settingsLocation = path.join(nw.App.dataPath, 'settings.json');

const APP_TITLE = 'WuhdAppusDat';
const DEFAULT_BACKGROUND = 'leaves.png';
const DEFAULT_BACKGROUND_BRIGHTNESS = 1;
const DEFAULT_BACKGROUND_CONTRAST = 1;
const DEFAULT_BACKGROUND_HUE_ROTATE = 0;
const DEFAULT_BACKGROUND_SATURATION = 1;
const DEFAULT_ALWAYS_ON_TOP = false;
const DEFAULT_TEXT_COLOR = '#FFEB3B';
const DEFAULT_TEXT_SHADOW = 'black';
const DEFAULT_FONT = 'Petrona';
const DEFAULT_FONT_SIZE = 32;
const DEFAULT_FONT_WEIGHT = 400;
const DEFAULT_FONT_STYLE = false;
const DEFAULT_INTERVAL = 1000;
const MAX_CONTRAST = 3;
const MAX_BRIGHTNESS = 15;
const MAX_SATURATION = 25;

function loadSettings () {
  const settings = {}
  if (!fs.existsSync(settingsLocation)) {
    return settings;
  }
  try {
    let contents = JSON.parse(fs.readFileSync(settingsLocation));
    return contents;
  } catch (err) {
    console.log('Error loading settings', err);
    return settings;
  }
}
