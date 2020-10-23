document.querySelector('title').innerText = APP_TITLE;
const getActiveProcessName = require('windows-active-process').getActiveProcessName;
const appName = document.getElementById('app-name');

function applySettings () {
  const settings = loadSettings();
  const background = document.getElementById('background');

  // Background image
  let backgroundImage = settings?.background || 'placeholder.png';
  if (settings?.background) {
    backgroundImage = 'file://' + backgroundImage.split('\\').join('/');
  }
  background.style.backgroundImage = 'url("' + backgroundImage + '")';

  // Text color
  appName.style.color = settings.textColor || DEFAULT_TEXT_COLOR;

  // Text Shadow
  if (settings.textShadow === 'none') {
    appName.style.textShadow = 'none';
  } else if (settings.textShadow === 'white') {
    appName.style.textShadow = '1px 1px 11px #FFF, 1px 1px 18px #FFF';
  } else {
    appName.style.textShadow = '1px 1px 11px #000, 1px 1px 18px #000';
  }
}

function closeChild () {
  if (global.optionsVisible) {
    console.log('closeChild');
    global.childWindow?.close();
    delete global.childWindow;
  }
}

function eventBindings () {
  let closeIcon = document.getElementById('window-control-close');
  closeIcon.addEventListener('click', function () {
    closeChild();
    nw.Window.get().close();
  });

  let optionsIcon = document.getElementById('window-control-options');
  optionsIcon.addEventListener('click', function () {
    closeChild();
    const windowOptions = {
      id: 'focus-options',
      frame: false,
      transparent: true,
      min_width: 595,
      min_height: 200
    };

    console.log('0');
    nw.Window.open('options.html', windowOptions, function () {
      global.optionsVisible = true;
      console.log('1', global.optionsVisible);
    });
    console.log('2');
  });
}

function setAppName () {
  let filePath = getActiveProcessName();
  let splitPath = filePath.split(path.sep);
  let fileName = splitPath[splitPath.length - 1];
  fileName = fileName.split('.')

  if (fileName.length > 1) {
    fileName.pop();
  }
  fileName = fileName.join('');
  fileName = fileName.split('_').join(' ');

  const commonApplications = {
    'calc': 'Calculator',
    'cmd': 'Command Prompt',
    'dfrgui': 'Disk Defragmenter',
    'dvdplay': 'DVD Player',
    'Electron': 'Electrom (Using 98% of available memory)',
    'mspaint': 'MS Paint',
    'nw': 'NW.JS',
    'perfmon': 'Windows Performance Monitor',
    'regedit': 'Windows Registry Editor',
    'resmon': 'Windows Resource Monitor',
    'soundrecorder': 'Sound Recorder',
    'taskmgr': 'Windows Task Manager',
    'wuauclt': 'Windows Updates'
  }

  fileName = commonApplications[fileName.toLowerCase()] || fileName;

  appName.innerText = fileName;
}

function initialize () {
  global.parentWindow = {
    refresh: function () {
      nw?.Window?.get()?.reload();
    },
    log: function (a, b, cb) {
      console.log(a, b);
      if (cb) {
        cb();
      }
    }
  }

  applySettings();
  eventBindings();
  setAppName();
  setInterval(setAppName, 3000);
}

initialize();
