const fs = global.require('fs');

const { SETTINGS_LOCATION } = global.require('./global-constants.js');

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
  // global.windowManager.appWindow(settings);
  settings.version = global.nw.App.manifest.version;
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
