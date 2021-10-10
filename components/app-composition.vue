<template>
  <div>
    <nav class="tabs">
      <a
        v-for="(tab, tabIndex) in tabs"
        :key="'tab' + tabIndex"
        class="tab"
        :class="{ 'active': activeTab === tab }"
        @click="activeTab = tab"
      >{{ tab }}</a>
    </nav>
    <app-options v-show="activeTab === 'Options'"></app-options>
    <text-options v-show="activeTab === 'Text'"></text-options>
    <background-options v-show="activeTab === 'Background'"></background-options>
    <about-app v-show="activeTab === 'About'"></about-app>
  </div>
</template>

<script>

module.exports = {
  name: 'app-composition',
  components: {
    'app-options': httpVueLoader('components/app-options.vue'),
    'text-options': httpVueLoader('components/text-options.vue'),
    'background-options': httpVueLoader('components/background-options.vue'),
    'about-app': httpVueLoader('components/about-app.vue')
  },
  data: function () {
    return {
      activeTab: 'About',
      tabs: [
        'Options',
        'Text',
        'Background',
        'About'
      ]
    };
  }
};
</script>

<style>
</style>
