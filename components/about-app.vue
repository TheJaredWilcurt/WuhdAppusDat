<template>
  <div class="about-container">
    <h2>{{ APP_TITLE }} v{{ APP_VERSION }}</h2>
    <p>
      Created by <external-link text="TheJaredWilcurt" :url="tjwUrl"></external-link> &copy;2021.
      Source code available on <external-link text="GitHub" :url="wuhdAppUrl"></external-link>.
    </p>

    <p>
      &#8220;<em>Leaves</em>&#8221; and &#8220;<em>Spikes</em>&#8221; background images created by <external-link text="Adam Phillips" :url="chluaidUrl"></external-link> (chluaid).
    </p>

    <strong>Technology Colophon:</strong>

    <ul>
      <li>Made with Vue.js, Vuex, and HTTP-Vue-Loader.</li>
      <li>Built with NW.js and Node.js.</li>
      <li>Windows version relies on &#8220;windows-active-process&#8221; library.</li>
      <li>Linux/OSX version relies on &#8220;active-win&#8221; library.</li>
      <li>Built on Windows 7, Window 10, OSX 10.11, Ubuntu 17, with SublimeText 4 and Photoshop CS6.</li>
    </ul>
  </div>
</template>

<script>
const {
  APP_TITLE,
  APP_VERSION
} = window.require('./scripts/global-constants.js');

module.exports = {
  name: 'about-app',
  components: {
    'external-link': httpVueLoader('components/form-fields/external-link.vue')
  },
  data: function () {
    return {
      APP_TITLE,
      APP_VERSION,

      tjwUrl: 'https://TheJaredWilcurt.com',
      chluaidUrl: 'https://www.twitch.tv/chluaid',
      wuhdAppUrl: 'https://github.com/TheJaredWilcurt/WuhdAppusDat'
    };
  }
};
</script>

<style>
.about-container {
  padding: 0px 18px;
  color: #531;
}
</style>
