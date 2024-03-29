<template>
  <div class="container">
    <menu-bar :is-maximized="isMaximized"></menu-bar>

    <div
      class="wrapper"
      :class="{ 'border-radius-0': isMaximized }"
    >
      <nav class="tabs">
        <a
          v-for="(tab, tabIndex) in tabs"
          class="tab"
          :class="{ 'active': lastViewedSection === tab }"
          @click="lastViewedSection = tab"
          :key="'tab' + tabIndex"
        >{{ tab }}</a>
      </nav>

      <app-options v-show="isCurrentTab(TAB_NAME_OPTIONS)"></app-options>
      <text-options v-show="isCurrentTab(TAB_NAME_TEXT)"></text-options>
      <explainer-options v-show="isCurrentTab(TAB_NAME_MESSAGE)"></explainer-options>
      <background-options v-show="isCurrentTab(TAB_NAME_BACKGROUND)"></background-options>
      <app-map v-show="isCurrentTab(TAB_NAME_ALIASES)"></app-map>
      <about-app v-show="isCurrentTab(TAB_NAME_ABOUT)"></about-app>
    </div>
  </div>
</template>

<script>
const { mapSettings } = window.require('./scripts/computeds.js');
const {
  TAB_NAME_OPTIONS,
  TAB_NAME_TEXT,
  TAB_NAME_MESSAGE,
  TAB_NAME_BACKGROUND,
  TAB_NAME_ALIASES,
  TAB_NAME_ABOUT
} = window.require('./scripts/global-constants.js');

const win = window.nw.Window.get();

module.exports = {
  name: 'app-composition',
  components: {
    'menu-bar': httpVueLoader('components/menu-bar.vue'),
    'app-options': httpVueLoader('components/app-options.vue'),
    'text-options': httpVueLoader('components/text-options.vue'),
    'explainer-options': httpVueLoader('components/explainer-options.vue'),
    'background-options': httpVueLoader('components/background-options.vue'),
    'app-map': httpVueLoader('components/app-map.vue'),
    'about-app': httpVueLoader('components/about-app.vue')
  },
  data: function () {
    return {
      TAB_NAME_OPTIONS,
      TAB_NAME_TEXT,
      TAB_NAME_MESSAGE,
      TAB_NAME_BACKGROUND,
      TAB_NAME_ALIASES,
      TAB_NAME_ABOUT,

      isMaximized: false,
      tabs: [
        TAB_NAME_OPTIONS,
        TAB_NAME_TEXT,
        TAB_NAME_MESSAGE,
        TAB_NAME_BACKGROUND,
        TAB_NAME_ALIASES,
        TAB_NAME_ABOUT
      ]
    };
  },
  methods: {
    isCurrentTab: function (tabName) {
      return this.lastViewedSection === tabName;
    }
  },
  computed: {
    ...mapSettings([
      'lastViewedSection'
    ])
  },
  created: function () {
    this.$store.commit('loadSettings');

    win.on('maximize', () => {
      this.isMaximized = true;
    });

    win.on('restore', () => {
      this.isMaximized = false;
    });
  }
};
</script>

<style>
.container {
  height: calc(100% - 35px);
}
.tabs {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 20px 0px 28px 0px;
}
.tab {
  display: inline-block;
  padding: 0px;
  color: salmon;
  font-size: 23px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
}
.tab:hover {
  color: #D17A71;
}
.tab.active {
  text-decoration: underline;
}
</style>
