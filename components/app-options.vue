<template>
  <div class="pill-form-container">
    <check-box
      v-model="alwaysOnTop"
      label="Always on top"
    ></check-box>

    <check-box
      v-show="canSetVisibleOnAllWorkspaces"
      v-model="visibleOnAllWorkspaces"
      label="Visible On All Workspaces"
    ></check-box>

    <check-box
      v-model="systemTray"
      label="System Tray"
    ></check-box>

    <drop-down
      v-model="closingApp"
      :options="closingAppOptions"
      :disabled="!systemTray"
      label="Closing app"
    ></drop-down>

    <range-slider
      v-model="updateInterval"
      label="Update Interval"
      min="1"
      max="30"
      :multiplier="0.5"
      :to-fixed="1"
      :default-value="DEFAULT_INTERVAL * 2"
    ></range-slider>

    <p>The "Update Interval" controls how often (in seconds) we check to see what application currently has focus. Faster speeds may not work as well on very low end devices, most people won't notice though.</p>
    <p>Changes to system tray take effect on next launch.</p>
  </div>
</template>

<script>
const { DEFAULT_INTERVAL } = window.require('./scripts/global-constants.js');
const { mapSettings } = window.require('./scripts/computeds.js');
const canSetVisibleOnAllWorkspaces = window.nw.Window.get().canSetVisibleOnAllWorkspaces();

module.exports = {
  name: 'app-options',
  components: {
    'check-box': httpVueLoader('components/form-fields/check-box.vue'),
    'drop-down': httpVueLoader('components/form-fields/drop-down.vue'),
    'range-slider': httpVueLoader('components/form-fields/range-slider.vue')
  },
  data: function () {
    return {
      DEFAULT_INTERVAL,

      canSetVisibleOnAllWorkspaces,
      closingAppOptions: [
        {
          label: 'exits',
          value: 'exit'
        },
        {
          label: 'sends to tray',
          value: 'tray'
        }
      ]
    };
  },
  computed: {
    systemTray: {
      get: function () {
        return this.$store.state.settings.systemTray;
      },
      set: function (value) {
        this.$store.commit('mutateSetting', { setting: 'systemTray', value });
        if (!value) {
          this.$store.commit('mutateSetting', { setting: 'closingApp', value: 'exit' });
        }
      }
    },
    ...mapSettings([
      'alwaysOnTop',
      'closingApp',
      'updateInterval',
      'visibleOnAllWorkspaces'
    ])
  }
};
</script>
