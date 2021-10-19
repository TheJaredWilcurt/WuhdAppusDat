<template>
  <div class="app-map-container">
    <p>If an application you run does not display a name you like, you can alias it here.</p>

    <drop-down
      v-model="sortBy"
      :options="sortByOptions"
      label="Sort By"
    ></drop-down>

    <transition-group class="app-map-transition-group" tag="div">
      <div
        v-for="app in appMap()"
        class="app-map-item"
        :key="app.id"
      >
        <div class="app-map-key-value-wrapper">
          <input
            :value="app.file"
            class="app-map-key"
            placeholder="calc"
            @input="setKey($event, 'file', app.id)"
          >
          <input
            :value="app.alias"
            class="app-map-value"
            placeholder="Calculator"
            @input="setKey($event, 'alias', app.id)"
          >
        </div>
        <button
          class="app-map-remove"
          title="Remove"
          @click="removeApp(app.id)"
        >&times;</button>
      </div>

      <div class="app-map-item add-another" :key="'add-another'">
        <a href="#" @click.prevent="addAnother">
          Add Another
        </a>
      </div>
    </transition-group>
  </div>
</template>

<script>
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
      ]
    };
  },
  methods: {
    setKey: async function ($event, key, id) {
      let value = $event.target.value;
      await this.$store.dispatch('mutateAppMap', { id, key, value });
      // this.$forceUpdate();
    },
    removeApp: async function (id) {
      await this.$store.dispatch('removeAppFromAppMap', id);
      // this.$forceUpdate();
    },
    addAnother: async function () {
      await this.$store.dispatch('addAppToAppMap');
      // this.$forceUpdate();
    },
    appMap: function () {
      console.log('re-compute');
      const appMap = this.$store.state.appMap;
      if (this.sortBy === 'none') {
        return appMap;
      }
      return appMap.sort((a, b) => {
        if (a[this.sortBy] === b[this.sortBy]) {
          return 0;
        }
        if (a[this.sortBy] > b[this.sortBy]) {
          return 1;
        }
        return -1;
      });
    }
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
