---
title: Syntax highlighting test
date: 2014-07-27
tags:
- testing
---

Let's test some code highlighting here...

[to bash anchor](#bash)

<h2 id="js">javascript</h2>

```javascript
module.exports = registerPartials;

function registerPartials(directory) {
  var Handlebars = require('handlebars');
  var fs = require('fs');

  var partialsDir = __dirname + "/../" + directory;

  var filenames = fs.readdirSync(partialsDir);

  filenames.forEach(function(filename) {
    var matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
      return;
    }
    var name = matches[1];
    //console.log(name);
    var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
    Handlebars.registerPartial(name, template);
  });
}
```

<h2 id="bash">bash</h2>

```bash
#!/bin/bash
####################################################################
# lets check if we're actually connected
# if we're not, lets try to connect to a wifi access point
####################################################################

check_net_status
if [ $connected == 0 ]; then

  if [ "$auto_connect" == "y" ]; then
    log "$STRING_TRY_TO_CONNECT"
    try_to_connect
  fi

  # ok, lets check again, after waiting a bit
  sleep 5
  check_net_status

  if [ $connected == 0 ]; then

    log "$STRING_NO_CONNECT_TO_WIFI"
    if [ -f "$last_response" ]; then # offline actions were enabled

      log ' -- Offline actions enabled!'
      offline_mode=1
      get_last_response
      process_module_config

    else
      exit 1
    fi

  fi
fi
```

[to js anchor](#js)