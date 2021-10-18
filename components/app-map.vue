<template>
  <div class="app-map-container">
    <p>If an application you run does not display a name you like, you can alias it here:</p>
    <div
      v-for="(app, appIndex) in appMap"
      class="app-map-item"
      :key="'app' + app.id"
    >
      <div class="app-map-key-value-wrapper">
        <input
          :value="app.file"
          class="app-map-key"
          @input="setKey($event, 'file', appIndex)"
        >
        <input
          :value="app.alias"
          class="app-map-value"
          @input="setKey($event, 'alias', appIndex)"
        >
      </div>
      <button
        class="app-map-remove"
        title="Remove"
        @click="removeApp(appIndex)"
      >&times;</button>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: 'app-map',
  methods: {
    setKey: function ($event, key, index) {
      let value = $event.target.value;
      this.$store.commit('mutateAppMap', { index, key, value });
    },
    removeApp: function (index) {
      this.$store.commit('removeAppFromAppMap', index);
    }
  },
  computed: {
    appMap: function () {
      return this.$store.state.settings.appMap;
    }
  }
};
</script>

<style>
.app-map-container {
  width: 100%;
  text-align: center;
}
.app-map-item {
  display: inline-block;
  border-radius: 0px;
  margin: 5px 24px 0px 24px;
  padding: 0px;
  font-size: 0px;
  box-shadow: none;
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
.app-map-key,
.app-map-value,
.app-map-remove {
  border: 0px;
}
.app-map-key {
  border-radius:  100px 0px 0px 100px;
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
</style>
