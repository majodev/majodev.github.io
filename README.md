# majodev.github.io

> as hosted on **[ranf.tl](http://ranf.tl)**

## Prerequisites
- [node](http://nodejs.org/)
- [grunt](http://gruntjs.com/) (`npm install -g grunt-cli`)

## Install
```bash
  git clone https://github.com/majodev/majodev.github.io.git
  cd majodev.github.io
  npm install -d
  grunt init
```

## Build dev
**features:** debug mode with drafts and source maps (+ custom Modernizr and lodash builds)

```bash
  grunt
```

grunt is now watching for changes and runs a webserver on `localhost:8080`.

## Build productive
**features:** concat & compress all js/css/html/xml files and start a gzip server

```bash
  grunt productive
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

### Check for 404 links
**Important:** needs [capsperjs](http://casperjs.org/) installed globally!

```bash
  npm install -g casperjs #install casperjs globally
  grunt linkcheck
```

## License
See `LICENSE.md` for detailed information
