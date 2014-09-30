---
title: Extracting libs from node projects
subtitle: Publishing my metalsmith plugins
tags: 
- javascript
---

So lets break out my customized plugins I've used with metalsmith to build up this site. This note will be a updated until I think the job is done...

- Update 1: [metalsmith-wordcount](https://github.com/majodev/metalsmith-wordcount) published.


## How extracting logic into smaller packages works in general

Before publishing, my custom metalsmith plugins lived in their respective `metalsmith-XXX.js` file and within the same project where I required them in my `index.js` file. 
- The first step was to set up a new package for each plugin.
- `npm init` to get a proper one and install all dependent packages that you will need in the plugin
- Copy over all the code and point the `main` key in your `package.json` to the proper lib file.
- `npm link` this your new package to locally use it within your root project ([see this](http://elegantcode.com/2011/12/16/taking-baby-steps-with-node-js-linking-local-packages-with-npm/))
- test and finally publish it ([see this](https://gist.github.com/coolaj86/1318304))

## Useful reading

[How to link local packages](http://elegantcode.com/2011/12/16/taking-baby-steps-with-node-js-linking-local-packages-with-npm/)

[How to publish to npm](https://gist.github.com/coolaj86/1318304)