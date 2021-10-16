const fs = require('fs');

const { SETTINGS_LOCATION } = require('./global-constants.js');

function loadSettings () {
  const settings = {};
  if (!fs.existsSync(SETTINGS_LOCATION)) {
    return settings;
  }
  try {
    let contents = JSON.parse(fs.readFileSync(SETTINGS_LOCATION));
    return contents;
  } catch (err) {
    console.log('Error loading settings', err);
    return settings;
  }
}

function saveSettings (settings) {
  if (
    global.windowManager &&
    global.windowManager.appWindow &&
    global.windowManager.appWindow.window &&
    global.windowManager.appWindow.window.App &&
    global.windowManager.appWindow.window.App.settingsChanged
  ) {
    global.windowManager.appWindow.window.App.settingsChanged(settings);
  }
  settings.version = nw.App.manifest.version;
  const data = JSON.stringify(settings, null, 2);
  try {
    fs.writeFileSync(SETTINGS_LOCATION, data);
  } catch (err) {
    console.log('Error saving settings', err);
  }
}

module.exports = {
  loadSettings,
  saveSettings
};
