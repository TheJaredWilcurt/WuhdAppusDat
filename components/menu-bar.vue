<template>
  <nav class="window-title-bar">
    <span>
      <img class="icon" src="icon/WuhdAppusDat16.png" alt="app icon">
      <strong class="app-title">{{ APP_TITLE }}</strong>
    </span>

    <div class="window-controls">
      <i
        aria-label="window control minimize"
        class="window-control-minimize"
        @click="windowControl('minimize')"
      ></i>
      <i
        v-show="!isMaximized"
        aria-label="window control restore"
        class="window-control-restore"
        @click="windowControl('restore')"
      ></i>
      <i
        v-show="isMaximized"
        aria-label="window control maximize"
        class="window-control-maximize"
        @click="windowControl('maximize')"
      ></i>
      <i
        aria-label="window control close"
        class="window-control-close"
        @click="windowControl('hide')"
      ></i>
    </div>
  </nav>
</template>

<script>
const win = window.nw.Window.get();
const {
  APP_TITLE
} = window.require('./scripts/global-constants.js');

module.exports = {
  name: 'app-composition',
  props: {
    isMaximized: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      APP_TITLE
    };
  },
  methods: {
    windowControl: function (action) {
      win[action]();
    }
  }
};
</script>

<style>
.icon {
  margin: 0px 2px;
  vertical-align: -1px;
}
.app-title {
  font-family: Petrona;
  font-size: 19px;
}

.window-title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: salmon;
  height: 35px;
  padding: 0px 0px 0px 7px;
  color: #111;
  font-family: 'Trebuchet MS', 'Century Gothic', sans-serif;
  -webkit-app-region: drag;
}

.window-controls {
  height: 100%;
  font-size: 0px;
  -webkit-app-region: no-drag;
  --window-control-bg: #DDD;
}
[class^="window-control-"] {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: var(--window-control-bg);
  width: 35px;
  height: 100%;
  border: 0px;
  margin: 0px;
  padding: 0px;
  font-size: 15px;
  font-style: normal;
  cursor: default;
  vertical-align: top;
}

.window-control-restore:hover:before,
.window-control-restore:hover:after,
.window-control-maximize:hover:after,
.window-controls i:hover {
  background: #CCC;
}
.window-control-restore:active:before,
.window-control-restore:active:after,
.window-control-maximize:active:after,
.window-controls i:active {
  background: #BBB;
}

.window-control-minimize:before,
.window-control-restore:before,
.window-control-restore:after,
.window-control-maximize:after,
.window-control-close:before,
.window-control-close:after {
  content: '';
  display: block;
  width: 12px;
  height: 12px;
  border-width: 0px;
  border-style: solid;
  border-color: #000;
}

.window-control-minimize:before {
  border-bottom-width: 1px;
}

.window-control-restore:before,
.window-control-restore:after,
.window-control-maximize:after {
  background: var(--window-control-bg);
  border-width: 1px;
  z-index: 2;
}
.window-control-restore:before {
  position: absolute;
  top: 8px;
  margin-left: 4px;
}

.window-control-close {
  position: relative;
}
.window-control-close:before,
.window-control-close:after {
  position: absolute;
  top: 12px;
  left: 17px;
  width: 1px;
  border-left-width: 1px;
}
.window-control-close:before {
  transform: rotate(45deg);
}
.window-control-close:after {
  transform: rotate(-45deg);
}
</style>
