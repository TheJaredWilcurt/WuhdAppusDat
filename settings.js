const fs = require('fs');
const path = require('path');
const settingsLocation = path.join(nw.App.dataPath, 'settings.json');

const APP_TITLE = 'WuhdAppusDat';
const DEFAULT_BACKGROUND = 'grass.png';
const DEFAULT_TEXT_COLOR = '#FFEB3B';
const DEFAULT_TEXT_SHADOW = 'black';
const DEFAULT_FONT = 'Georgia';
const DEFAULT_FONT_SIZE = 32;
const DEFAULT_INTERVAL = 3000;

const commonApplications = {
  'calc': 'Calculator',
  'cmd': 'Command Prompt',
  'dfrgui': 'Disk Defragmenter',
  'dvdplay': 'DVD Player',
  'Electron': 'Electrom (Using 98% of available memory)',
  'mspaint': 'MS Paint',
  'nw': 'NW.JS',
  'perfmon': 'Windows Performance Monitor',
  'regedit': 'Windows Registry Editor',
  'resmon': 'Windows Resource Monitor',
  'soundrecorder': 'Sound Recorder',
  'taskmgr': 'Windows Task Manager',
  'vlc': 'VLC Media Player',
  'wuauclt': 'Windows Updates'
};

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
