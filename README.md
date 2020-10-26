# WuhdAppusDat

Free, open source, desktop app for streamers that lets their audience know what program is currently in focus.

> ***"Great for art, game dev, and coding streams!"***


* * *


# ⮞⮞⮞⮞ DOWNLOADS AVAILABLE ⮜⮜⮜⮜

Downloads are available under the [GitHub Releases](https://github.com/TheJaredWilcurt/WuhdAppusDat/releases) tab.

**Supported Systems:** Windows 7, 8, 10 (64-Bit only)

1. Download zip
1. Unzip file
1. Double-click on `WuhdAppusDat.exe`

You can right-click + drag to create a shortcut to `WuhdAppusDat.exe`

You can modify the `app-map.json` file to change how program names are displayed.


* * *


## LIVE DEMO

* [Twitch Clip](https://clips.twitch.tv/TallSarcasticMoonOneHand) - Look at the bottom to see WuhdAppusDat reveal the currently focused application. (**Note:** the styling is completely customizable)

> "Fantastic, this is exactly what I needed" - Adam Phillips (chluaid), animator of "Bitey of Brackenwood", Twitch Streamer


* * *


## Features

* Transparent, resizable window that states the name of the currently focused executable
* Ships with some background images, or can use your own.
* Backgrounds stretch to fit inside the transparent window without being cropped
* Background image Hue, Saturation, Brightness, and Contrast can be adujsted
* Retains your settings, window size/positioning between uses (settings are stored per-user account on the PC)
* Text size, color, formatting, and drop shadow are customizable
* Allows for any installed system font, including custom ones you've downloaded or created
* Can be pinned to "Always on Top"
* App can be targeted by OBS, StreamLabs and similar software to be added as an overlay in a scene.


* * *


## Running locally for development

The dependency `windows-active-process` requires a native module be built.

1. Install Node.js & npm (Specifically Node.js [v13.13.0](https://nodejs.org/dist/v13.13.0/) to match NW.js). I use [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) to do this.
1. `npm install -g windows-build-tools`
1. `npm install -g nw-gyp`
1. Download the repo
1. `npm install`
1. `npm start`


## Technology Colophon

* Written in Vanilla JS, HTML, and CSS.
* Built with NW.js, Node.js.
* Relies on "windows-active-process" library.
* Built on Windows 7, with SublimeText 3 and Photoshop CS6.
