const tray = require('./scripts/tray.js').createTray();
const settings = require('./scripts/settings.js').loadSettings();
const { DEFAULT_SYSTEM_TRAY } = require('./scripts/global-constants.js');

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
  global.optionsWindow = optionsWin;

  optionsWin.on('closed', function () {
    optionsWin = null;
  });

  nw.Window.open('index.html', appWindowOptions, function (appWin) {
    appWin.setShadow(false);
    global.appWindow = appWin;

    if (systemTray) {
      global.createTray();
    }

    appWin.on('closed', function () {
      this.hide();
      appWin = null;
      global.appWindow = null;

      if (optionsWin !== null) {
        optionsWin.close(true);
      }

      global.optionsWindow.close(true);

      // After closing the new window, close the main window.
      this.close(true);
    });
  });
});

setInterval(function () {
  if (!global.appWindow) {
    // I don't like this hack, but it works for now
    nw.Window.get().close();
  }
}, 3000);
