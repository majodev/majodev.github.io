# ranf.tl

website source code hosted on majodev.github.io and **ranf.tl**!

## Prerequites
These have to be installed globally:
- node
- grunt (`npm install -g grunt-cli`)

```bash
  npm install -d // install all project dependencies
  grunt init // init project (modernizr build, ...)
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

## Run gzip server with emulated delay
```bash
  grunt serverdelay
```