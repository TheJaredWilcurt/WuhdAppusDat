Vue.config.devtools = true;

const globalConstants = window.require('./scripts/global-constants.js');
const settingsHelpers = window.require('./scripts/settings.js');

document.querySelector('title').innerText = globalConstants.APP_TITLE + ' Options';
if (process.platform === 'darwin') {
  document.querySelector('body').classList.add('osx');
}

Vue.use(Vuex);

function saveAndSend (state) {
  const settings = {
    ...state.settings,
    version: window.nw.App.manifest.version
  };
  settingsHelpers.saveSettings(settings);
  settingsHelpers.sendSettings(settings);
}

const store = new Vuex.Store({
  state: {
    settings: {
      version: globalConstants.APP_VERSION,
      lastViewedSection: globalConstants.TAB_NAME_OPTIONS,

      alwaysOnTop: globalConstants.DEFAULT_ALWAYS_ON_TOP,
      systemTray: globalConstants.DEFAULT_SYSTEM_TRAY,
      closingApp: globalConstants.DEFAULT_CLOSING_APP,
      visibleOnAllWorkspaces: globalConstants.DEFAULT_VISIBLE_ON_ALL_WORKSPACES,
      updateInterval: globalConstants.DEFAULT_INTERVAL,
      outputFile: null,

      fontFamily: globalConstants.DEFAULT_FONT_FAMILY,
      fontSize: globalConstants.DEFAULT_FONT_SIZE,
      fontItalics: globalConstants.DEFAULT_FONT_ITALICS,
      fontWeight: globalConstants.DEFAULT_FONT_WEIGHT,
      textColor: globalConstants.DEFAULT_TEXT_COLOR,
      textPosition: globalConstants.DEFAULT_TEXT_POSITION,
      textShadow: globalConstants.DEFAULT_TEXT_SHADOW,

      explainerMessage: globalConstants.DEFAULT_EXPLAINER_MESSAGE,
      explainerFontFamily: globalConstants.DEFAULT_EXPLAINER_FONT_FAMILY,
      explainerFontItalics: globalConstants.DEFAULT_EXPLAINER_FONT_ITALICS,
      explainerFontSize: globalConstants.DEFAULT_EXPLAINER_FONT_SIZE,
      explainerFontWeight: globalConstants.DEFAULT_EXPLAINER_FONT_WEIGHT,
      explainerTextColor: globalConstants.DEFAULT_EXPLAINER_TEXT_COLOR,
      explainerTextShadow: globalConstants.DEFAULT_EXPLAINER_TEXT_SHADOW,
      explainerTop: globalConstants.DEFAULT_EXPLAINER_TOP,
      explainerLeft: globalConstants.DEFAULT_EXPLAINER_LEFT,

      backgroundImage: globalConstants.DEFAULT_BACKGROUND_IMAGE,
      backgroundHueRotate: globalConstants.DEFAULT_BACKGROUND_HUE_ROTATE,
      backgroundBrightness: globalConstants.DEFAULT_BACKGROUND_BRIGHTNESS,
      backgroundSaturation: globalConstants.DEFAULT_BACKGROUND_SATURATION,
      backgroundContrast: globalConstants.DEFAULT_BACKGROUND_CONTRAST,
      backgroundFlipHorizontal: globalConstants.DEFAULT_BACKGROUND_FLIP_HORIZONTAL,
      backgroundFlipVertical: globalConstants.DEFAULT_BACKGROUND_FLIP_VERTICAL,
      appMap: []
    }
  },
  mutations: {
    mutateSetting: function (state, { setting, value }) {
      Vue.set(state.settings, setting, value);
      saveAndSend(state);
    },
    loadSettings: function (state) {
      const settings = settingsHelpers.loadSettings() || {};
      delete settings.version;

      const settingKeys = Object.keys(state.settings);
      Object.entries(settings).forEach(function ([key, value]) {
        if (settingKeys.includes(key) && value !== undefined) {
          Vue.set(state.settings, key, settings[key]);
        }
      });
    }
  },
  actions: {
    saveAndSend: function (store) {
      saveAndSend(store.state);
    }
  }
});

window.App = new Vue({
  el: '#app',
  template: '<app-composition />',
  components: {
    'app-composition': httpVueLoader('components/app-composition.vue')
  },
  store
});
