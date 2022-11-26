# Anichinu v1.24
Anichinu is a browser extension which makes watching Anime & Waifu easy : https://chrome.google.com/webstore/detail/anichinu/bempahanfbelceikgbhicebchefdlpog 

To start with development:

- `yarn install` to install dependencies.
- `yarn run build:chrome` to build chrome extension in extension/ directory
- `yarn run build:firefox` to build firefox addon in extension/ directory
- `yarn run build:opera` to build opera extension in extension/ directory
- `yarn run build` builds and packs extensions all at once to extension/ directory

### Development

- `yarn install` to install dependencies.
- To watch file changes in developement

  - Chrome
    - `yarn run dev:chrome`
  - Firefox
    - `yarn run dev:firefox`
  - Opera
    - `yarn run dev:opera`

Note: By default the `manifest.json` is set with version `0.0.0`. The webpack loader will update the version in the build with that of the `package.json` version. In order to release a new version, update version in `package.json` and run script.
