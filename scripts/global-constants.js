const path = require('path');

function GUID () {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const globalConstants = Object.freeze({
  GUID,
  APP_TITLE: 'WuhdAppusDat',
  APP_VERSION: nw.App.manifest.version,
  DEFAULT_BACKGROUND_IMAGE: 'images/leaves.png',
  DEFAULT_BACKGROUND_BRIGHTNESS: 6.66,
  DEFAULT_BACKGROUND_CONTRAST: 33.33,
  DEFAULT_BACKGROUND_HUE_ROTATE: 0,
  DEFAULT_BACKGROUND_SATURATION: 0,
  DEFAULT_ALWAYS_ON_TOP: false,
  DEFAULT_CLOSING_APP: 'exit',
  DEFAULT_VISIBLE_ON_ALL_WORKSPACES: false,
  DEFAULT_SYSTEM_TRAY: false,
  DEFAULT_TEXT_COLOR: '#FFEB3B',
  DEFAULT_TEXT_SHADOW: 'black',
  DEFAULT_FONT_FAMILY: 'Petrona',
  DEFAULT_FONT_ITALICS: false,
  DEFAULT_FONT_SIZE: 32,
  DEFAULT_FONT_WEIGHT: 4,
  DEFAULT_TEXT_POSITION: 21.44,
  DEFAULT_INTERVAL: 0.5,
  MAX_CONTRAST: 3,
  MAX_BRIGHTNESS: 15,
  MAX_SATURATION: 24,
  SATURATION_UPPER_MULTIPLIER: 3,
  SETTINGS_LOCATION: path.join(nw.App.dataPath, 'settings.json'),
  TAB_NAME_OPTIONS: 'Options',
  TAB_NAME_TEXT: 'Text',
  TAB_NAME_BACKGROUND: 'Background',
  TAB_NAME_ALIASES: 'Aliases',
  TAB_NAME_ABOUT: 'About',
  DEFAULT_APP_MAP: Object.freeze([
    Object.freeze({
      id: GUID(),
      file: 'acrord32',
      alias: 'Adobe Acrobat Reader'
    }),
    Object.freeze({
      id: GUID(),
      file: 'afterfx',
      alias: 'Adobe After Effects'
    }),
    Object.freeze({
      id: GUID(),
      file: 'calc',
      alias: 'Calculator'
    }),
    Object.freeze({
      id: GUID(),
      file: 'charmap',
      alias: 'Character Map'
    }),
    Object.freeze({
      id: GUID(),
      file: 'cmd',
      alias: 'Command Prompt'
    }),
    Object.freeze({
      id: GUID(),
      file: 'code - insiders',
      alias: 'Visual Studio Code - Insiders'
    }),
    Object.freeze({
      id: GUID(),
      file: 'dfrgui',
      alias: 'Disk Defragmenter'
    }),
    Object.freeze({
      id: GUID(),
      file: 'dvdplay',
      alias: 'DVD Player'
    }),
    Object.freeze({
      id: GUID(),
      file: 'excel',
      alias: 'Microsoft Excel'
    }),
    Object.freeze({
      id: GUID(),
      file: 'fireworks',
      alias: 'Adobe Fireworks'
    }),
    Object.freeze({
      id: GUID(),
      file: 'flash',
      alias: 'Adobe Flash Professional'
    }),
    Object.freeze({
      id: GUID(),
      file: 'harmonypremium',
      alias: 'Harmony Premium'
    }),
    Object.freeze({
      id: GUID(),
      file: 'iexplore',
      alias: 'Internet Explorer'
    }),
    Object.freeze({
      id: GUID(),
      file: 'illustrator',
      alias: 'Adobe Illustrator'
    }),
    Object.freeze({
      id: GUID(),
      file: 'indesign',
      alias: 'Adobe InDesign'
    }),
    Object.freeze({
      id: GUID(),
      file: 'liberkeymenu',
      alias: 'LiberKey'
    }),
    Object.freeze({
      id: GUID(),
      file: 'photo',
      alias: 'Affinity Photo'
    }),
    Object.freeze({
      id: GUID(),
      file: 'photoshop',
      alias: 'Adobe Photoshop'
    }),
    Object.freeze({
      id: GUID(),
      file: 'magnify',
      alias: 'Magnifier'
    }),
    Object.freeze({
      id: GUID(),
      file: 'msiexec',
      alias: 'Software Installation'
    }),
    Object.freeze({
      id: GUID(),
      file: 'mspaint',
      alias: 'MS Paint'
    }),
    Object.freeze({
      id: GUID(),
      file: 'nw',
      alias: 'NW.JS'
    }),
    Object.freeze({
      id: GUID(),
      file: 'nwjs',
      alias: 'NW.JS'
    }),
    Object.freeze({
      id: GUID(),
      file: 'obs64',
      alias: 'OBS Studio'
    }),
    Object.freeze({
      id: GUID(),
      file: 'perfmon',
      alias: 'Windows Performance Monitor'
    }),
    Object.freeze({
      id: GUID(),
      file: 'powershell',
      alias: 'Windows PowerShell'
    }),
    Object.freeze({
      id: GUID(),
      file: 'powerpnt',
      alias: 'Microsoft PowerPoint'
    }),
    Object.freeze({
      id: GUID(),
      file: 'regedit',
      alias: 'Windows Registry Editor'
    }),
    Object.freeze({
      id: GUID(),
      file: 'resmon',
      alias: 'Windows Resource Monitor'
    }),
    Object.freeze({
      id: GUID(),
      file: 'soundrecorder',
      alias: 'Sound Recorder'
    }),
    Object.freeze({
      id: GUID(),
      file: 'speedgrade',
      alias: 'Adobe SpeedGrade'
    }),
    Object.freeze({
      id: GUID(),
      file: 'st3',
      alias: 'Sublime Text'
    }),
    Object.freeze({
      id: GUID(),
      file: 'st4',
      alias: 'Sublime Text'
    }),
    Object.freeze({
      id: GUID(),
      file: 'taskmgr',
      alias: 'Windows Task Manager'
    }),
    Object.freeze({
      id: GUID(),
      file: 'vlc',
      alias: 'VLC Media Player'
    }),
    Object.freeze({
      id: GUID(),
      file: 'vmplayer',
      alias: 'VMWare Player'
    }),
    Object.freeze({
      id: GUID(),
      file: 'vsc',
      alias: 'Visual Studio Code'
    }),
    Object.freeze({
      id: GUID(),
      file: 'winword',
      alias: 'Microsoft Word'
    }),
    Object.freeze({
      id: GUID(),
      file: 'wuauclt',
      alias: 'Windows Updates'
    }),
    Object.freeze({
      id: GUID(),
      file: 'wuhdappusdat',
      alias: 'WuhdAppusDat'
    })
  ])
});

module.exports = globalConstants;
