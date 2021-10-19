
Vue.config.devtools = true;

const path = window.require('path');
const settingsHelpers = window.require('./scripts/settings.js');
const {
  APP_TITLE,
  DEFAULT_INTERVAL,
  MAX_BRIGHTNESS,
  MAX_CONTRAST,
  MAX_SATURATION,
  SATURATION_UPPER_MULTIPLIER
} = require('./scripts/global-constants.js');

document.querySelector('title').innerText = APP_TITLE;

window.App = new Vue({
  el: '#app',
  components: {
    'main-nav': httpVueLoader('components/main-nav.vue')
  },
  data: {
    currentlyInFocusApp: '',
    interval: null,
    settings: {}
  },
  methods: {
    updateInterval: function () {
      if (this.interval) {
        clearInterval(this.interval);
      }
      const amount = (this.settings.updateInterval || DEFAULT_INTERVAL) * 1000;
      this.interval = setInterval(this.setAppName, amount);
    },
    appNameCleanUp: function (fileName) {
      fileName = fileName.split('_').join(' ');

      if (fileName === atob('ZWxlY3Ryb24=')) {
        fileName = atob('RWxlY3Ryb20gKFVzaW5nIDk4JSBvZiBhdmFpbGFibGUgbWVtb3J5KQ==');
      } else {
        fileName = (this.appMap[fileName.toLowerCase()]) || fileName;
      }

      return fileName || '';
    },
    setLinuxOrOSXAppName: async function () {
      const activeWin = window.require('active-win');
      let win = await activeWin();
      let fileName = win && win.owner && win.owner.name;
      if (!fileName || typeof(fileName) !== 'string') {
        fileName = '';
      }
      fileName = this.appNameCleanUp(fileName);
      this.currentlyInFocusApp = fileName;
    },
    setWindowsAppName: function () {
      const getActiveProcessName = window.require('windows-active-process').getActiveProcessName;
      let filePath = getActiveProcessName();
      if (!filePath || typeof(filePath) !== 'string') {
        filePath = '';
      }
      let splitPath = filePath.split(path.sep);
      let fileName = splitPath[splitPath.length - 1];
      fileName = fileName.split('.');

      if (fileName.length > 1) {
        fileName.pop();
      }
      fileName = fileName.join('');
      fileName = this.appNameCleanUp(fileName);
      this.currentlyInFocusApp = fileName;
    },
    setAppName: function () {
      if (window.process.platform === 'win32') {
        this.setWindowsAppName();
      } else {
        this.setLinuxOrOSXAppName();
      }
    },
    settingsChanged: function (settings) {
      Object.entries(settings).forEach(([key, value]) => {
        this.$set(this.settings, key, value);
      });

      this.updateInterval();
      window.nw.Window.get().setAlwaysOnTop(!!settings.alwaysOnTop);
      window.nw.Window.get().setVisibleOnAllWorkspaces(!!settings.visibleOnAllWorkspaces);
    },
    convertSettingToPercent: function (value, max) {
      value = parseFloat(value);
      if (value !== 0) {
        value = (max * value) / 100;
      }
      value = value.toFixed(3);
      value = parseFloat(value);
      return value;
    }
  },
  computed: {
    appMap: function () {
      const appMap = {};
      const appList = this.settings && this.settings.appMap;
      if (appList) {
        appList.forEach(function (app) {
          appMap[app.file] = app.alias;
        });
      }
      return appMap;
    },
    backgroundStyles: function () {
      let backgroundImage = this.settings.backgroundImage;
      const shippedBackgrounds = [
        'images/none.png',
        'images/leaves.png',
        'images/spikes.png',
        'images/bubbles.png'
      ];

      if (
        backgroundImage &&
        !shippedBackgrounds.includes(backgroundImage)
      ) {
        backgroundImage = 'file://' + backgroundImage.split('\\').join('/');
      }
      if (backgroundImage) {
        backgroundImage = 'url("' + backgroundImage + '")';
      }

      let brightness;
      let contrast;
      let hueRotate;
      let saturation;
      if (typeof(this.settings.backgroundHueRotate) === 'number') {
        hueRotate = 'hue-rotate(' + this.settings.backgroundHueRotate + 'deg)';
      }
      if (typeof(this.settings.backgroundBrightness) === 'number') {
        brightness = this.settings.backgroundBrightness;
        brightness = this.convertSettingToPercent(brightness, MAX_BRIGHTNESS);
        brightness = 'brightness(' + brightness + ')';
      }
      if (typeof(this.settings.backgroundContrast) === 'number') {
        contrast = this.settings.backgroundContrast;
        contrast = this.convertSettingToPercent(contrast, MAX_CONTRAST);
        contrast = 'contrast(' + contrast + ')';
      }
      if (typeof(this.settings.backgroundSaturation) === 'number') {
        saturation = this.settings.backgroundSaturation;
        if (saturation > 0) {
          saturation = this.convertSettingToPercent(saturation, MAX_SATURATION / SATURATION_UPPER_MULTIPLIER);
          saturation = saturation + 1;
        } else if (saturation < 0) {
          saturation = (saturation * -1) / 100;
          saturation = 1 - saturation;
        } else {
          saturation = 1;
        }
        saturation = 'saturate(' + saturation + ')';
      }
      let filters = [
        brightness,
        contrast,
        hueRotate,
        saturation
      ].filter(Boolean).join(' ');

      return [
        'background-image:' + backgroundImage,
        'filter:' + filters || 'none'
      ].join(';');
    },
    textStyles: function () {
      let fontItalics = 'normal';
      if (this.settings.fontItalics) {
        fontItalics = 'italic';
      }

      let textShadow = 'none';
      if (this.settings.textShadow === 'white') {
        textShadow = '1px 1px 11px #FFF, 1px 1px 18px #FFF';
      } else if (this.settings.textShadow === 'black') {
        textShadow = '1px 1px 11px #000, 1px 1px 18px #000';
      }

      return [
        'margin-top:' + this.settings.textPosition + 'px',
        'color:' + this.settings.textColor,
        'font-family:' + this.settings.fontFamily,
        'font-size:' + this.settings.fontSize + 'px',
        'font-style:' + fontItalics,
        'font-weight:' + (this.settings.fontWeight * 100),
        'text-shadow:' + textShadow
      ].join(';');
    }
  },
  created: function () {
    this.setAppName();
    const settings = settingsHelpers.getSettings();
    this.settingsChanged(settings);
  }
});
