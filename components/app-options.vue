<template>
  <div id="options-container" class="pill-form-container">
    <check-box v-model="alwaysOnTop" label="Always on top"></check-box>

    <div id="visible-on-all-workspaces-container" class="pill-form pill-form-checkbox hidden">
      <label class="pill-label" for="visible-on-all-workspaces-input">
        Visible&nbsp;On&nbsp;All&nbsp;Workspaces:
      </label>
      <span id="faux-visible-on-all-workspaces" class="pill-content last-pill-section">
        <input type="checkbox" id="visible-on-all-workspaces-input">
      </select>
    </div>

    <div class="pill-form pill-form-checkbox">
      <label class="pill-label" for="system-tray-input">
        System&nbsp;Tray:
      </label>
      <span id="faux-system-tray" class="pill-content last-pill-section">
        <input type="checkbox" id="system-tray-input">
      </select>
    </div>

    <div class="pill-form">
      <label class="pill-label" for="closing-app-input">
        Closing&nbsp;app:
      </label>
      <select class="pill-content last-pill-section" id="closing-app-input">
        <option value="exit">exits</option>
        <option value="tray">sends to tray</option>
      </select>
    </div>

    <div class="pill-form">
      <label class="pill-label" for="update-interval-input">
        Update&nbsp;Interval:
      </label>
      <span class="pill-content">
        <input type="range" id="update-interval-input" min="1" max="15">
      </span>
      <span id="faux-update-interval">
        15
      </span>
      <button id="clear-update-interval" class="pill-end last-pill-section" title="Reset to default">&times;</button>
    </div>

    <p>The "Update Interval" controls how often (in seconds) we check to see what application currently has focus. Faster speeds may not work as well on very low end devices, most people won't notice though.</p>
    <p>Changes to system tray take effect on next launch.</p>
  </div>
</template>

<script>
const {
  DEFAULT_ALWAYS_ON_TOP
} = window.require('./scripts/global-constants.js');
const { mapSetting } = window.require('./scripts/computeds.js');

module.exports = {
  name: 'app-options',
  components: {
    'check-box': httpVueLoader('components/form-fields/check-box.vue')
  },
  data: function () {
    return {
      closingApp: 'exit',
      systemTray: false
    };
  },
  computed: {
    ...mapSetting('alwaysOnTop')
  }
};
</script>

<style>
</style>
