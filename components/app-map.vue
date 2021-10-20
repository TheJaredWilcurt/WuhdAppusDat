<template>
  <div class="app-map-container">
    <p>If an application you run does not display a name you like, you can alias it here.</p>

    <drop-down
      v-model="sortBy"
      :options="sortByOptions"
      label="Sort By"
    ></drop-down>

    <transition-group
      class="app-map-transition-group"
      tag="div"
      :key="listKey"
    >
      <div
        v-for="app in sortedAppMap"
        class="app-map-item"
        :data-key="app.id"
        :key="app.id"
      >
        <div class="app-map-key-value-wrapper">
          <input
            v-model="app.file"
            class="app-map-key"
            placeholder="calc"
            @input="saveAndSend"
          >
          <input
            v-model="app.alias"
            class="app-map-value"
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
    </transition-group>
  </div>
</template>

<script>
const globalConstants = window.require('./scripts/global-constants.js');

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
      listKey: 0
    };
  },
  methods: {
    findAppById: function (appMap, id) {
      return appMap.findIndex(function (app) {
        return app.id === id;
      });
    },
    bumpKey: function () {
      // this.listKey = this.listKey + 1;
      this.$forceUpdate();
    },
    saveAndSend: function () {
      const setting = 'appMap';
      const value = this.appMap;
      this.$store.commit('mutateSetting', { setting, value });
      this.$store.dispatch('saveAndSend');
    },
    setKey: function ($event, key, id) {
      let value = $event.target.value;
      const index = this.findAppById(this.appMap, id);
      this.$set(this.appMap[index], key, value);
      this.saveAndSend();
    },
    removeApp: function (id) {
      const index = this.findAppById(this.appMap, id);
      this.$delete(this.appMap, index);
      // this.appMap.splice(index, 1);
      this.saveAndSend();
      this.bumpKey();
    },
    addAnother: function () {
      const newApp = {
        id: globalConstants.GUID(),
        file: '',
        alias: ''
      };
      const index = this.appMap.length;
      this.$set(this.appMap, index, newApp);
      this.$set(this.appMap[index], 'file', '');
      this.saveAndSend();
      this.bumpKey();
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
    }
  },
  created: function () {
    this.appMap = this.$store.state.settings.appMap || [ ...globalConstants.DEFAULT_APP_MAP ];
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
.app-map-key-value-wrapper {
  display: inline-block;
  background: #FFF6FA;
  border-radius: 100px;
  box-shadow: 1px 1px 5px inset rgba(136, 119, 91, 0.31), 1px 1px 0px rgba(136, 119, 91, 0.31);
}
.app-map-key,
.app-map-value {
  background: transparent;
  margin: 0px;
  padding: 8px 16px;
  color: #333;
  font-size: 16px;
}
.app-map-key:focus,
.app-map-value:focus {
  outline: none;
}
.app-map-key,
.app-map-value,
.app-map-remove {
  border: 0px;
}
.app-map-key {
  border-radius:  100px 0px 0px 100px;
}
.app-map-key::placeholder{
  color: #3335;
}
.app-map-value::placeholder {
  color: rgba(158, 107, 107, 0.33);
}
.app-map-value {
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
