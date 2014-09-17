# ranf.tl

website source code hosted on majodev.github.io and **ranf.tl**!

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
**features:** debug mode with drafts and code source maps (+ custom Modernizr and lodash build)

```bash
  grunt
```

grunt is now watching for changes and runs a webserver on `localhost:8080`.

## Build productive
**features:** concat & compress all js/css/html/xml files and start a gzip server

```bash
  grunt productive
```

### Run gzip server with emulated delay
```bash
  grunt serverdelay
```

### Minify all images
```bash
  grunt imagemin
```

### Check for 404 links
**important:** needs casperjs installed globally!

```bash
  npm install -g casperjs #install casperjs globally
  grunt linkcheck
```

## License
See `LICENSE.md` for detailed information