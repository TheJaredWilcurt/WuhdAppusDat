<template>
  <div>
    <nav class="tabs">
      <a
        v-for="(tab, tabKey) in tabs"
        :key="'tab' + tabKey"
        class="tab"
        :class="{ 'active': activeTab === tabKey }"
        @click="activeTab = tabKey"
      >{{ tabKey }}</a>
    </nav>
    <keep-alive>
      <component :is="tabs[activeTab].component"></component>
    </keep-alive>
  </div>
</template>

<script>
const AboutApp = httpVueLoader('components/about-app.vue');

module.exports = {
  name: 'options-window',
  data: function () {
    return {
      activeTab: 'Options',
    };
  },
  computed: {
    tabs: function () {
      return {
        Options: AboutApp,
        Text: AboutApp,
        Background: AboutApp,
        About: AboutApp
      };
    }
  }
};
</script>

<style>
</style>
