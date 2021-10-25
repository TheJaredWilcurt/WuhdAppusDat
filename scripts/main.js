Vue.config.devtools = true;

/* eslint-disable-next-line no-unused-vars */
window.downloadButtons = new Vue({
  el: '#button-container',
  name: 'DownloadButtons',
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

window.osProgressBars = new Vue({
  el: '#os-progress-bars',
  name: 'OsProgressBars',
  data: function () {
    return {
      releases: []
    };
  },
  computed: {
    totals: function () {
      let win = 0;
      let lin = 0;
      let osx = 0;
      this.releases.forEach(function (release) {
        release.assets.forEach(function (asset) {
          if (asset.name.toLowerCase().startsWith('win')) {
            win = win + asset.download_count;
          } else if (asset.name.toLowerCase().startsWith('lin')) {
            lin = lin + asset.download_count;
          } else if (asset.name.toLowerCase().startsWith('osx')) {
            osx = osx + asset.download_count;
          }
        });
      });
      return { win, lin, osx };
    }
  }
});

/* eslint-disable-next-line no-unused-vars */
const releasesTable = new Vue({
  el: '#releases-table',
  template: '<releases-table />',
  components: {
    'releases-table': httpVueLoader('components/releases-table.vue')
  }
});
