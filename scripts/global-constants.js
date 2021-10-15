const path = require('path');

const globalConstants = Object.freeze({
  APP_TITLE: 'WuhdAppusDat',
  APP_VERSION: nw.App.manifest.version,
  DEFAULT_BACKGROUND: 'images/leaves.png',
  DEFAULT_BACKGROUND_BRIGHTNESS: 1,
  DEFAULT_BACKGROUND_CONTRAST: 1,
  DEFAULT_BACKGROUND_HUE_ROTATE: 0,
  DEFAULT_BACKGROUND_SATURATION: 1,
  DEFAULT_ALWAYS_ON_TOP: false,
  DEFAULT_CLOSING_APP: 'exit',
  DEFAULT_VISIBLE_ON_ALL_WORKSPACES: false,
  DEFAULT_SYSTEM_TRAY: false,
  DEFAULT_TEXT_COLOR: '#FFEB3B',
  DEFAULT_TEXT_SHADOW: 'black',
  DEFAULT_FONT: 'Petrona',
  DEFAULT_FONT_ITALICS: false,
  DEFAULT_FONT_SIZE: 32,
  DEFAULT_FONT_WEIGHT: 400,
  DEFAULT_TEXT_POSITION: 21.44,
  DEFAULT_INTERVAL: 1,
  MAX_CONTRAST: 3,
  MAX_BRIGHTNESS: 15,
  MAX_SATURATION: 25,
  SETTINGS_LOCATION: path.join(nw.App.dataPath, 'settings.json')
});

module.exports = globalConstants;
