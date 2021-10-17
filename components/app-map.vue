<template>
  <div class="app-map-container">
    <p>If an application you run does not display a name you like, you can alias it here:</p>
    <div
      v-for="(value, key) in appMap"
      class="pill-form"
      :key="'app' + key"
    >
      <input
        :value="key"
        class="pill-label"
        @click="setKey(key)"
      >
      <input
        :value="value"
        class="pill-content last-pill-section"
      >
      <button
        class="pill-end"
        title="Remove"
        @click="removeAppMap(key)"
      >&times;</button>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: 'app-composition',
  methods: {
    setKey: function () {
    },
    removeApp: function () {
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
.app-map-container .pill-form {
  border-radius: 0px;
  margin: 5px 48px 0px 0px;
  padding: 0px;
  box-shadow: none;
}
.app-map-container .pill-label,
.app-map-container .pill-content {
  box-shadow: 2px 2px 5px rgba(136, 119, 91, 0.53);
}
.app-map-container .pill-end {
  border-radius: 50%;
  margin: 0px 0px 0px 4px;
}
</style>
