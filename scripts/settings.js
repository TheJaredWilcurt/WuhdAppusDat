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
  settings.version = nw.App.manifest.version;
  const data = JSON.stringify(settings, null, 2);
  try {
    fs.writeFileSync(SETTINGS_LOCATION, data);
  } catch (err) {
    console.log('Error saving settings', err);
  }
  global.refreshParent();
}

module.exports = {
  loadSettings,
  saveSettings
};
