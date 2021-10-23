Vue.config.devtools = true;

/* eslint-disable-next-line no-unused-vars */
const downloadButtons = new Vue({
  el: '#button-container',
  data: function () {
    return {
      releases: {
        Windows: 'https://github.com/TheJaredWilcurt/WuhdAppusDat/releases',
        Linux: 'https://github.com/TheJaredWilcurt/WuhdAppusDat/releases',
        OSX: 'https://github.com/TheJaredWilcurt/WuhdAppusDat/releases'
      }
    };
  }
});

/* eslint-disable-next-line no-unused-vars */
const releasesTable = new Vue({
  el: '#app',
  template: '<releases-table />',
  components: {
    'releases-table': httpVueLoader('components/releases-table.vue')
  }
});
