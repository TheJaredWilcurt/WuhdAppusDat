// nw.Window.get().showDevTools();

const path = require('path');
const appName = document.getElementById('app-name');
const getActiveProcessName = require('windows-active-process').getActiveProcessName;


function setAppName () {
  let filePath = getActiveProcessName();
  let splitPath = filePath.split(path.sep);
  let fileName = splitPath[splitPath.length - 1];
  fileName = fileName.split('.')

  if (fileName.length > 1) {
    fileName.pop();
  }

  appName.innerText = fileName.join('.');
}
setAppName();
setInterval(setAppName, 3000);

const background = document.getElementById('background');
background.style.backgroundImage = 'url("placeholder.png")';


