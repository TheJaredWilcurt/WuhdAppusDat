<template>
  <div id="app-map-container" class="app-map-container">
    <p>
      <a href="#" @click.prevent="appMapVisible = !appMapVisible">
        <template v-if="appMapVisible">
          Hide app name alias form
        </template>
        <template v-else>
          Show app name alias form
        </template>
      </a>
    </p>
    <template v-if="appMapVisible">
      <p>There are <strong>{{ appMaps.length - 1 }}</strong> custom app name aliases.</p>
      <div
        v-for="(app, appIndex) in appMaps"
        class="pill-form"
        :key="'app' + appIndex"
      >
        <input v-model="app.file" class="pill-label">
        <input v-model="app.alias" class="pill-content">
        <button
          class="pill-end last-pill-section"
          title="Remove"
          @click="removeAppMap(appIndex)"
        >&times;</button>
      </div>
      {{ appMapToBeSaved }}
    </template>
  </div>
</template>

<script>
const fs = require('fs');

module.exports = {
  name: 'app-composition',
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
};
</script>

<style>
.app-map-container {
  width: 100%;
  text-align: center;
}
</style>
