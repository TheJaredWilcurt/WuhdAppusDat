<template>
  <div id="options-container" class="pill-form-container">
    <check-box
      v-model="alwaysOnTop"
      label="Always on top"
    ></check-box>

    <check-box
      v-show="canSetVisibleOnAllWorkspaces"
      v-model="visibleOnAllWorkspaces"
      label="Visible On All Workspaces"
    ></check-box>

    <div class="pill-form pill-form-checkbox">
      <label class="pill-label" for="system-tray-input">
        System&nbsp;Tray:
      </label>
      <span id="faux-system-tray" class="pill-content last-pill-section">
        <input id="system-tray-input" type="checkbox">
      </span>
    </div>

    <div class="pill-form">
      <label class="pill-label" for="closing-app-input">
        Closing&nbsp;app:
      </label>
      <select id="closing-app-input" class="pill-content last-pill-section">
        <option value="exit">exits</option>
        <option value="tray">sends to tray</option>
      </select>
    </div>

    <div class="pill-form">
      <label class="pill-label" for="update-interval-input">
        Update&nbsp;Interval:
      </label>
      <span class="pill-content">
        <input
          id="update-interval-input"
          type="range"
          min="1"
          max="15"
        >
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
const { mapSetting } = window.require('./scripts/computeds.js');
const canSetVisibleOnAllWorkspaces = window.nw.Window.get().canSetVisibleOnAllWorkspaces();

module.exports = {
  name: 'app-options',
  components: {
    'check-box': httpVueLoader('components/form-fields/check-box.vue')
  },
  data: function () {
    return {
      canSetVisibleOnAllWorkspaces,
      closingApp: 'exit',
      systemTray: false
    };
  },
  computed: {
    ...mapSetting('alwaysOnTop'),
    ...mapSetting('visibleOnAllWorkspaces')
  }
};
</script>

<style>
</style>
