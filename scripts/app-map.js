const fs = require('fs');
const settings = require('./scripts/settings.js').loadSettings();

// eslint-disable-next-line no-unused-vars
const app = Vue
  .createApp({
    data: function () {
      return {
        appMapVisible: false,
        appMaps: []
      };
    },
    methods: {
      prepareAppMap: function () {
        let appMap = settings.appMap;
        if (!appMap) {
          try {
            appMap = settings.appMap || JSON.parse(fs.readFileSync('./app-map.json'));
          } catch (err) {
            appMap = {};
          }
        }
        let apps = [];
        Object.keys(appMap).forEach(function (app) {
          apps.push({
            file: app,
            alias: appMap[app]
          });
        });
        apps.push({
          file: '',
          alias: ''
        });

        this.appMaps = apps;
      },
      removeAppMap: function (index) {
        this.appMaps.splice(index, 1);
      }
    },
    computed: {
      appMapToBeSaved: function () {
        let appMap = {};
        this.appMaps.forEach(function (app) {
          appMap[app.file] = app.alias;
        });
        return appMap;
      }
    },
    created: function () {
      this.prepareAppMap();
    }
  })
  .mount('#app-map-container');
