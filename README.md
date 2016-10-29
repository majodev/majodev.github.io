# majodev.github.io

> as hosted on **[mranftl.com](http://mranftl.com)**

## Prerequisites
- [node](http://nodejs.org/)
- [grunt](http://gruntjs.com/) (`npm install -g grunt-cli`)

## Install
```bash
  git clone https://github.com/majodev/majodev.github.io.git
  cd majodev.github.io
  npm install -d
  # grunt init # this step is no longer required.
```

## Build dev
**features:** debug mode with drafts and source maps (+ custom Modernizr and lodash builds)

```bash
  grunt
```

grunt is now watching for changes and runs a webserver on `localhost:8080`.

## Build productive
**features:** concat & compress all js/css/html/xml files and start a gzip server (if confirmed publish to gh-pages)

```bash
  grunt productive
```

## Publish
shortcut to build productive + publish on gh-pages

```bash
  grunt publish
```

## Minor manual tasks
These tasks must be run manually.

### Run gzip server with emulated delay
```bash
  grunt serverdelay
```

### Minify all images
**Important:** overwrites every image found in `src` and `support`.
```bash
  grunt imagemin
```

### Rebuild favicons
**Important:** needs [imagemagick](http://www.imagemagick.org/) in `PATH`
```bash
  grunt fav
```

### Check for 404 links
**Important:** needs [capsperjs](http://casperjs.org/) installed globally!
```bash
  npm install -g casperjs #install casperjs globally
  grunt linkcheck
```

<!-- ### Rebuild resume
**Important:** Needs to be run on a Mac with working [MacTeX](https://tug.org/mactex/) installation. Uses fonts and `sips` from the Apple ecosystem.
```bash
  grunt resume
``` -->

## License
[See `LICENSE.md` for detailed information](https://github.com/majodev/majodev.github.io/blob/source/LICENSE.md)
