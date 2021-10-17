<template>
  <div class="app-map-container">
    <p>If an application you run does not display a name you like, you can alias it here:</p>
    <div
      v-for="(value, key) in appMap"
      class="pill-form"
      :key="'app' + key"
    >
      <input :value="key" class="pill-label">
      <input :value="value" class="pill-content">
      <button
        class="pill-end last-pill-section"
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
</style>
