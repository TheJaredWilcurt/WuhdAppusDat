require('./scripts/tray.js').createTray();
const settings = require('./scripts/settings.js').loadSettings();
const { DEFAULT_SYSTEM_TRAY } = require('./scripts/global-constants.js');
global.windowManager = {};

let systemTray = DEFAULT_SYSTEM_TRAY;
if (settings && typeof(settings.systemTray) === 'boolean') {
  systemTray = settings.systemTray;
}

const optionsWindowOptions = {
  id: 'WuhdAppusDat-options',
  icon: 'icon/WuhdAppusDat-Icon.png',
  show_in_taskbar: !systemTray,
  frame: false,
  transparent: true,
  width: 596,
  height: 448,
  min_width: 595,
  min_height: 200,
  show: false
};
const appWindowOptions = {
  id: 'WuhdAppusDat',
  icon: 'icon/WuhdAppusDat-Icon.png',
  show_in_taskbar: !systemTray,
  frame: false,
  width: 700,
  height: 200,
  position: 'center',
  transparent: true
};

nw.Window.open('options.html', optionsWindowOptions, function (optionsWin) {
  optionsWin.setShadow(false);
  global.windowManager.optionsWindow = optionsWin;

  optionsWin.on('closed', function () {
    optionsWin = null;
  });

  nw.Window.open('index.html', appWindowOptions, function (appWin) {
    appWin.setShadow(false);
    global.windowManager.appWindow = appWin;

    if (systemTray) {
      global.createTray();
    }

    appWin.on('closed', function () {
      this.hide();
      appWin = null;
      global.windowManager.appWindow = null;

      if (optionsWin !== null) {
        optionsWin.close(true);
      }

      global.windowManager.optionsWindow.close(true);

      // After closing the new window, close the main window.
      this.close(true);
    });
  });
});
