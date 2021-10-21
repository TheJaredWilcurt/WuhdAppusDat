const fs = require('fs');

const { SETTINGS_LOCATION } = require('./global-constants.js');

function settingsExist () {
  return fs.existsSync(SETTINGS_LOCATION);
}

// Load from disk
function loadSettings () {
  const settings = {};
  if (!settingsExist()) {
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

// Save to disk
function saveSettings (settings) {
  const data = JSON.stringify(settings, null, 2);
  try {
    fs.writeFileSync(SETTINGS_LOCATION, data);
  } catch (err) {
    console.log('Error saving settings', err);
  }
}

// Send vuex settings from Options window to main window
function sendSettings (settings) {
  if (
    global.windowManager &&
    global.windowManager.appWindow &&
    global.windowManager.appWindow.window &&
    global.windowManager.appWindow.window.App &&
    global.windowManager.appWindow.window.App.settingsChanged
  ) {
    global.windowManager.appWindow.window.App.settingsChanged(settings);
  }
}

// Get vuex settings from Options window
function getSettings () {
  if (
    global.windowManager &&
    global.windowManager.optionsWindow &&
    global.windowManager.optionsWindow.window &&
    global.windowManager.optionsWindow.window.App &&
    global.windowManager.optionsWindow.window.App.$store &&
    global.windowManager.optionsWindow.window.App.$store.state &&
    global.windowManager.optionsWindow.window.App.$store.state.settings
  ) {
    return {
      ...global.windowManager.optionsWindow.window.App.$store.state.settings
    };
  }
  return {};
}

module.exports = {
  getSettings,
  loadSettings,
  saveSettings,
  sendSettings,
  settingsExist
};
