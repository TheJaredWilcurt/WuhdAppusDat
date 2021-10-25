<p align="center"><img src="icon/WuhdAppusDat-Icon.png" alt="WuhdAppusDat icon" width="256"></p>


# WuhdAppusDat

"WuhdAppusDat" answers the question "What app is that" by all your little pog champ viewers.

Free, open source, desktop app for streamers that lets their audience know what program is currently in focus.

> ***"Great for art, game dev, and coding streams!"***


* * *


## LIVE DEMO

* [Twitch Clip](https://www.youtube.com/watch?v=z6R2sItBGS8) - Look at the bottom to see WuhdAppusDat reveal the currently focused application. (**Note:** the styling is completely customizable)

> "Fantastic, this is exactly what I needed" - Adam Phillips (chluaid), animator of "Bitey of Brackenwood", Twitch Streamer


* * *


<h1 align="center">==== DOWNLOADS AVAILABLE ====</h1>

Downloads are available at the website:

* https://TheJaredWilcurt.com/WuhdAppusDat


* * *


## Running locally for development


### Environment setup

The `windows-active-process` and `active-win` dependencies require a native module be built.

1. Set up Node Version Manager:
   * Windows: [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
   * Linux/OSX: [nvm](https://github.com/nvm-sh/nvm)
1. Use `nvm` to install **SPECIFICALLY** Node.js [v10.11.0](https://nodejs.org/dist/v13.13.0/) (to match NW.js).
   * `nvm install 10.11.0 && nvm use 10.11.0`
1. On OSX 10.13 and below install [Swift runtime support libraries](https://support.apple.com/kb/DL1998)
1. On Windows:
   * run `npm install -g windows-build-tools`
   * You may need to run `Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser` in Powershell
   * You may need to install Visual Studio Community Edition
1. On Linux
   * `sudo apt update`
   * `sudo apt install python2-minimal`
   * `sudo update-alternatives --install /usr/bin/python python /usr/bin/python2 1`
   * `sudo apt-get install build-essential`
1. `npm install -g nw-gyp`
1. Download or clone the repo
1. `npm install`


### Running loally

1. Do the environment setup once
1. `npm start`

* * *


## Technology Colophon

* Made with Vue.js, Vuex, and HTTP-Vue-Loader.
* Built with NW.js and Node.js.
* Windows version relies on "windows-active-process" library.
* Linux/OSX version relies on "active-win" library.
* Built on Windows 7, Window 10, OSX 10.11, Ubuntu 20, with SublimeText 4 and Photoshop CS6.
