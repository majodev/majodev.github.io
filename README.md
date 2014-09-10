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

## Build (dev environment)
```bash
  grunt
```

go to `localhost:8080`.

## Build (productive) and start a gzip server
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
