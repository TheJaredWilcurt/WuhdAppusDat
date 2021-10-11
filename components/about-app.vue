<template>
  <div id="about-container" class="about-container">
    <h2>{{ APP_TITLE }} v<span id="app-version">{{ APP_VERSION }}</span></h2>
    <p>
      Created by <a href="https://TheJaredWilcurt.com" class="external">TheJaredWilcurt</a> &copy;2021.
      Source code available on
      <a
        href="#"
        :title="wuhdAppUrl"
        @click.prevent="openInDefaultBrowser(wuhdAppUrl)"
      >GitHub</a>.
    </p>

    <p>
      &#8220;<em>Leaves</em>&#8221; and &#8220;<em>Spikes</em>&#8221; background images created by
      <a
        href="#"
        :title="chluaidUrl"
        @click="openInDefaultBrowser(chluaidUrl)"
      >Adam Phillips</a> (chluaid).
    </p>

    <strong>Technology Colophon:</strong>

    <ul>
      <li>Made with Vue.js and HTTP-Vue-Loader.</li>
      <li>Built with NW.js and Node.js.</li>
      <li>Windows version relies on &#8220;windows-active-process&#8221; library.</li>
      <li>Linux/OSX version relies on &#8220;active-win&#8221; library.</li>
      <li>Built on Windows 7, OSX 10.11, Ubuntu 17, with SublimeText 3 and Photoshop CS6.</li>
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
  data: function () {
    return {
      APP_TITLE,
      APP_VERSION,
      chluaidUrl: 'https://www.twitch.tv/chluaid',
      wuhdAppUrl: 'https://github.com/TheJaredWilcurt/WuhdAppusDat'
    };
  },
  methods: {
    openInDefaultBrowser: function (url) {
      window.nw.Shell.openExternal(url);
    }
  }
};
</script>

<style>
.about-container {
  padding: 0px 18px;
  color: #531;
}
a.external {
  color: #C24F42;
}
a.external:hover {
  color: salmon;
}
</style>
