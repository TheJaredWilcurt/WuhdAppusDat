function generateUniqueId () {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function generateDefaultAppMap () {
  return [
    {
      id: 'acrord32',
      file: 'acrord32',
      alias: 'Adobe Acrobat Reader'
    },
    {
      id: 'afterfx',
      file: 'afterfx',
      alias: 'Adobe After Effects'
    },
    {
      id: 'calc',
      file: 'calc',
      alias: 'Calculator'
    },
    {
      id: 'charmap',
      file: 'charmap',
      alias: 'Character Map'
    },
    {
      id: 'cmd',
      file: 'cmd',
      alias: 'Command Prompt'
    },
    {
      id:  'code - insiders',
      file: 'code - insiders',
      alias: 'Visual Studio Code - Insiders'
    },
    {
      id: 'dfrgui',
      file: 'dfrgui',
      alias: 'Disk Defragmenter'
    },
    {
      id: 'dvdplay',
      file: 'dvdplay',
      alias: 'DVD Player'
    },
    {
      id: 'excel',
      file: 'excel',
      alias: 'Microsoft Excel'
    },
    {
      id: 'fireworks',
      file: 'fireworks',
      alias: 'Adobe Fireworks'
    },
    {
      id: 'flash',
      file: 'flash',
      alias: 'Adobe Flash Professional'
    },
    {
      id: 'harmonypremium',
      file: 'harmonypremium',
      alias: 'Harmony Premium'
    },
    {
      id: 'iexplore',
      file: 'iexplore',
      alias: 'Internet Explorer'
    },
    {
      id: 'illustrator',
      file: 'illustrator',
      alias: 'Adobe Illustrator'
    },
    {
      id: 'indesign',
      file: 'indesign',
      alias: 'Adobe InDesign'
    },
    {
      id: 'liberkeymenu',
      file: 'liberkeymenu',
      alias: 'LiberKey'
    },
    {
      id: 'photo',
      file: 'photo',
      alias: 'Affinity Photo'
    },
    {
      id: 'photoshop',
      file: 'photoshop',
      alias: 'Adobe Photoshop'
    },
    {
      id: 'magnify',
      file: 'magnify',
      alias: 'Magnifier'
    },
    {
      id: 'msiexec',
      file: 'msiexec',
      alias: 'Software Installation'
    },
    {
      id: 'mspaint',
      file: 'mspaint',
      alias: 'MS Paint'
    },
    {
      id: 'nw',
      file: 'nw',
      alias: 'NW.JS'
    },
    {
      id: 'nwjs',
      file: 'nwjs',
      alias: 'NW.JS'
    },
    {
      id: 'obs64',
      file: 'obs64',
      alias: 'OBS Studio'
    },
    {
      id: 'perfmon',
      file: 'perfmon',
      alias: 'Windows Performance Monitor'
    },
    {
      id: 'powershell',
      file: 'powershell',
      alias: 'Windows PowerShell'
    },
    {
      id: 'powerpnt',
      file: 'powerpnt',
      alias: 'Microsoft PowerPoint'
    },
    {
      id: 'regedit',
      file: 'regedit',
      alias: 'Windows Registry Editor'
    },
    {
      id: 'resmon',
      file: 'resmon',
      alias: 'Windows Resource Monitor'
    },
    {
      id: 'soundrecorder',
      file: 'soundrecorder',
      alias: 'Sound Recorder'
    },
    {
      id: 'speedgrade',
      file: 'speedgrade',
      alias: 'Adobe SpeedGrade'
    },
    {
      id: 'st3',
      file: 'st3',
      alias: 'Sublime Text'
    },
    {
      id: 'st4',
      file: 'st4',
      alias: 'Sublime Text'
    },
    {
      id: 'taskmgr',
      file: 'taskmgr',
      alias: 'Windows Task Manager'
    },
    {
      id: 'vlc',
      file: 'vlc',
      alias: 'VLC Media Player'
    },
    {
      id: 'vmplayer',
      file: 'vmplayer',
      alias: 'VMWare Player'
    },
    {
      id: 'vsc',
      file: 'vsc',
      alias: 'Visual Studio Code'
    },
    {
      id: 'winword',
      file: 'winword',
      alias: 'Microsoft Word'
    },
    {
      id: 'wuauclt',
      file: 'wuauclt',
      alias: 'Windows Updates'
    },
    {
      id: 'wuhdappusdat',
      file: 'wuhdappusdat',
      alias: 'WuhdAppusDat'
    }
  ];
}

module.exports = {
  generateUniqueId,
  generateDefaultAppMap
};
