<template>
  <div class="app-map-container">
    <p>If an application you run does not display a name you like, you can alias it here.</p>
    <p>Showing {{ appMap.length }} app alias{{ appMap.length === 1 ? '' : 'es' }}.</p>

    <transition-group class="app-map-transition-group" tag="div">
      <div
        v-if="appMap.length > 1"
        class="app-map-item app-map-sorter"
        key="sorter"
      >
        <drop-down
          v-model="sortBy"
          :options="sortByOptions"
          label="Sort By"
        ></drop-down>
      </div>

      <div
        v-for="app in sortedAppMap"
        class="app-map-item"
        :key="app.id"
      >
        <div class="app-map-file-alias-wrapper">
          <input
            v-model="app.file"
            class="app-map-file"
            list="running-proceses"
            placeholder="calc"
            @input="saveAndSend"
            @focus="getRunningProcesses"
          >
          <input
            v-model="app.alias"
            class="app-map-alias"
            placeholder="Calculator"
            @input="saveAndSend"
          >
        </div>
        <button
          class="app-map-remove"
          title="Remove"
          @click.prevent="removeApp(app.id)"
        >&times;</button>
      </div>

      <div class="app-map-item add-another" key="needed-for-animation">
        <a href="#" @click.prevent="addAnother">
          Add Another
        </a>
      </div>

      <div
        class="app-map-item add-another"
        key="needed-also-needed-for-animation"
      >
        <a href="#" @click.prevent="loadDefaults">
          Load defaults
        </a>
      </div>
    </transition-group>

    <datalist id="running-proceses">
      <option
        v-for="runningProcess in runningProcesses"
        :value="runningProcess"
        :key="runningProcess"
      ></option>
    </datalist>
  </div>
</template>

<script>
const path = window.require('path');
const psList = window.require('ps-list');

const helpers = window.require('./scripts/helpers.js');
const { settingsExist } = window.require('./scripts/settings.js');

module.exports = {
  name: 'app-map',
  components: {
    'drop-down': httpVueLoader('components/form-fields/drop-down.vue')
  },
  data: function () {
    return {
      sortBy: 'none',
      sortByOptions: [
        {
          lable: '',
          value: 'none'
        },
        {
          label: 'Name',
          value: 'file'
        },
        {
          label: 'Alias',
          value: 'alias'
        }
      ],
      appMap: [],
      runningProcesses: []
    };
  },
  methods: {
    getRunningProcesses: async function () {
      let list = await psList({ all: true });
      list = list
        .filter(function (item) {
          return item.name.endsWith('.exe');
        })
        .map(function (item) {
          return path.parse(item.name).name;
        })
        .filter((item) => {
          return !this.allAliasedFileNames.includes(item.toLowerCase());
        });
      list = Array.from(new Set(list));
      list = list.sort(function compare (a, b) {
        if (a.toLowerCase() < b.toLowerCase()) {
          return -1;
        }
        if (a.toLowerCase() > b.toLowerCase()) {
          return 1;
        }
        return 0;
      });

      this.runningProcesses = list;
    },

    findAppById: function (id) {
      return this.appMap.findIndex(function (app) {
        return app.id === id;
      });
    },
    saveAndSend: function () {
      const setting = 'appMap';
      const value = this.appMap;
      this.$store.commit('mutateSetting', { setting, value });
      this.$store.dispatch('saveAndSend');
    },
    saveSendAndUpdate: function () {
      this.saveAndSend();
      this.$forceUpdate();
    },
    removeApp: function (id) {
      const index = this.findAppById(id);
      this.$delete(this.appMap, index);
      this.saveSendAndUpdate();
    },
    addAnother: function () {
      const newApp = {
        id: helpers.generateUniqueId(),
        file: '',
        alias: ''
      };
      const index = this.appMap.length;
      this.$set(this.appMap, index, newApp);
      this.saveSendAndUpdate();
    },
    loadDefaults: function () {
      const defaultApps = helpers.generateDefaultAppMap();
      defaultApps.forEach((defaultApp) => {
        if (this.findAppById(defaultApp.id) === -1) {
          const index = this.appMap.length;
          this.$set(this.appMap, index, defaultApp);
        }
      });
      this.saveSendAndUpdate();
    }
  },
  computed: {
    sortedAppMap: function () {
      if (this.sortBy === 'none') {
        return this.appMap;
      }
      return this.appMap.sort((a, b) => {
        if (a[this.sortBy] === b[this.sortBy]) {
          return 0;
        }
        if (a[this.sortBy] > b[this.sortBy]) {
          return 1;
        }
        return -1;
      });
    },
    allAliasedFileNames: function () {
      return this.sortedAppMap.map(function (app) {
        return app.file.toLowerCase();
      });
    }
  },
  created: function () {
    this.appMap = this.$store.state.settings.appMap;
    if (!settingsExist()) {
      this.appMap = helpers.generateDefaultAppMap();
      this.saveSendAndUpdate();
    }
    this.getRunningProcesses();
  }
};
</script>

<style>
.app-map-container {
  width: 100%;
  text-align: center;
}
.app-map-transition-group {
  position: relative;
  max-width: 489px;
  margin: 0px auto;
}
.app-map-item {
  display: block;
  border-radius: 0px;
  margin: 5px 0px 0px 0px;
  padding: 0px;
  font-size: 0px;
  box-shadow: none;
  transition: 1s ease all;
}
.app-map-item.v-enter,
.app-map-item.v-leave-to {
  opacity: 0.0;
  transform: translateY(30px);
}
.app-map-item.v-leave-active {
  position: absolute;
  left: 0px;
}
.app-map-sorter {
  width:  489px;
  max-width: 489px;
  font-size: 16px;
  text-align: center;
}
.app-map-file-alias-wrapper {
  display: inline-block;
  background: #FFF6FA;
  border-radius: 100px;
  box-shadow: 1px 1px 5px inset rgba(136, 119, 91, 0.31), 1px 1px 0px rgba(136, 119, 91, 0.31);
}
.app-map-file,
.app-map-alias {
  background: transparent;
  margin: 0px;
  padding: 8px 16px;
  color: #333;
  font-size: 16px;
}
.app-map-file:focus,
.app-map-alias:focus {
  outline: none;
}
.app-map-file,
.app-map-alias,
.app-map-remove {
  border: 0px;
}
.app-map-file {
  border-radius:  100px 0px 0px 100px;
}
.app-map-file::placeholder{
  color: #3335;
}
.app-map-alias::placeholder {
  color: rgba(158, 107, 107, 0.33);
}
.app-map-alias {
  border-radius:  0px 100px 100px 0px;
  box-shadow:  0px 0px 57px inset rgba(255, 162, 0, 0.25);
}
.app-map-remove {
  height: 32px;
  background: #F27D7D;
  border: 0px;
  border-radius: 50%;
  margin: 0px 0px 0px 7px;
  font-size: 36px;
  line-height: 0.6;
  box-shadow: 2px 2px 2px rgba(136, 119, 91, 0.42);
  cursor: pointer;
  vertical-align: top;
}
.app-map-remove:hover,
.app-map-remove:focus {
  background: #C95454;
  outline: none;
}
.add-another {
  margin: 24px 0px;
  font-size: 16px;
}
</style>
