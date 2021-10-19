Vue.config.devtools = true;

const globalConstants = window.require('./scripts/global-constants.js');
const settingsHelpers = window.require('./scripts/settings.js');

document.querySelector('title').innerText = globalConstants.APP_TITLE + ' Options';
if (process.platform === 'darwin') {
  document.querySelector('body').classList.add('osx');
}

Vue.use(Vuex);

function findAppById (appMap, id) {
  return appMap.findIndex(function (app) {
    return app.id === id;
  });
}

const store = new Vuex.Store({
  state: {
    appMap: [
      ...globalConstants.DEFAULT_APP_MAP
    ],
    settings: {
      version: globalConstants.APP_VERSION,
      lastViewedSection: globalConstants.TAB_NAME_OPTIONS,

      alwaysOnTop: globalConstants.DEFAULT_ALWAYS_ON_TOP,
      systemTray: globalConstants.DEFAULT_SYSTEM_TRAY,
      closingApp: globalConstants.DEFAULT_CLOSING_APP,
      visibleOnAllWorkspaces: globalConstants.DEFAULT_VISIBLE_ON_ALL_WORKSPACES,
      updateInterval: globalConstants.DEFAULT_INTERVAL,

      fontFamily: globalConstants.DEFAULT_FONT_FAMILY,
      fontSize: globalConstants.DEFAULT_FONT_SIZE,
      fontItalics: globalConstants.DEFAULT_FONT_ITALICS,
      fontWeight: globalConstants.DEFAULT_FONT_WEIGHT,
      textColor: globalConstants.DEFAULT_TEXT_COLOR,
      textPosition: globalConstants.DEFAULT_TEXT_POSITION,
      textShadow: globalConstants.DEFAULT_TEXT_SHADOW,

      backgroundImage: globalConstants.DEFAULT_BACKGROUND_IMAGE,
      backgroundHueRotate: globalConstants.DEFAULT_BACKGROUND_HUE_ROTATE,
      backgroundBrightness: globalConstants.DEFAULT_BACKGROUND_BRIGHTNESS,
      backgroundSaturation: globalConstants.DEFAULT_BACKGROUND_SATURATION,
      backgroundContrast: globalConstants.DEFAULT_BACKGROUND_CONTRAST,
    }
  },
  mutations: {
    mutateAppMap: function (state, { id, key, value }) {
      const index = findAppById(state.appMap, id);
      Vue.set(state.appMap[index], key, value);
    },
    removeAppFromAppMap: function (state, id) {
      const index = findAppById(state.appMap, id);
      Vue.delete(state.appMap, index);
    },
    addAppToAppMap: function (state) {
      const newApp = {
        id: globalConstants.GUID(),
        file: '',
        alias: ''
      };
      Vue.set(state.appMap, state.appMap.length, newApp);
    },
    mutateSetting: function (state, { setting, value }) {
      Vue.set(state.settings, setting, value);
    },
    loadSettings: function (state) {
      const settings = settingsHelpers.loadSettings() || {};

      state.appMap = settings.appMap;
      delete settings.appMap;
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
      const settings = {
        ...store.state.settings,
        appMap: store.state.appMap,
        version: window.nw.App.manifest.version
      };
      settingsHelpers.saveSettings(settings);
      settingsHelpers.sendSettings(settings);
      // Vue.nextTick();
    },
    mutateAppMap: function (store, payload) {
      store.commit('mutateAppMap', payload);
      store.dispatch('saveAndSend');
    },
    removeAppFromAppMap: function (store, payload) {
      store.commit('removeAppFromAppMap', payload);
      store.dispatch('saveAndSend');
    },
    addAppToAppMap: function (store, payload) {
      store.commit('addAppToAppMap', payload);
      store.dispatch('saveAndSend');
    },
    mutateSetting: function (store, payload) {
      store.commit('mutateSetting', payload);
      store.dispatch('saveAndSend');
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
