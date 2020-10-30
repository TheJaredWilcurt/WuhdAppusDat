let tray;
function createTray () {
  // Create a tray icon
  tray = new nw.Tray({
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
        global.optionsWindow.show();
      }
    },
    {
      type: 'normal',
      label: 'Show Window',
      click: function () {
        global.appWindow.show();
      }
    },
    {
      type: 'normal',
      label: 'Hide Window',
      click: function () {
        global.appWindow.hide();
      }
    },
    {
      type: 'separator'
    },
    {
      type: 'normal',
      label: 'Exit',
      click: function () {
        global.appWindow.close();
      }
    }
  ];

  // Append all menu items to the menu
  menuItems.forEach(function (item) {
    menu.append(new nw.MenuItem(item));
  });

  // Place the menu in the tray
  tray.menu = menu;

  tray.on('click', function (evt) {
    global.appWindow.show();
  });
}

function removeTray () {
  tray.remove();
  tray = null;
}
