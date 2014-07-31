---
title: Code highlighting test
date: 2014-07-27
tags:
- testing
---

Let's test some code highlighting here...

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
