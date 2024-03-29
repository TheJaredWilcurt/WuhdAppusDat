function createTray () {
  global.tray;
  global.createTray = function () {
    // Create a tray icon
    global.tray = new nw.Tray({
      title: 'Tray',
      tooltip: 'WuhdAppusDat',
      icon: 'icon/WuhdAppusDat16.png'
    });

    // Give it a menu
    let menu = new nw.Menu();

    // Create an array of the items to be placed in the menu
    let menuItems = [
      {
        type: 'normal',
        label: 'Options',
        click: function () {
          global.windowManager.optionsWindow.show();
        }
      },
      {
        type: 'normal',
        label: 'Show Window',
        click: function () {
          global.windowManager.appWindow.show();
        }
      },
      {
        type: 'normal',
        label: 'Hide Window',
        click: function () {
          global.windowManager.appWindow.hide();
        }
      },
      {
        type: 'separator'
      },
      {
        type: 'normal',
        label: 'Exit',
        click: function () {
          global.windowManager.appWindow.close();
        }
      }
    ];

    // Append all menu items to the menu
    menuItems.forEach(function (item) {
      menu.append(new nw.MenuItem(item));
    });

    // Place the menu in the tray
    global.tray.menu = menu;

    global.tray.on('click', function () {
      global.windowManager.appWindow.show();
    });
  };

  global.removeTray = function () {
    global.tray.remove();
    global.tray = null;
  };
}

module.exports = {
  createTray
};
