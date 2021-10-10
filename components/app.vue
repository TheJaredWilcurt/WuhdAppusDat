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
    <about-app v-show="activeTab === 'About'"></about-app>
  </div>
</template>

<script>

module.exports = {
  name: 'options-window',
  components: {
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
