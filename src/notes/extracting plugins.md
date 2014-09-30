---
uid: note_extracting_libs_node_projects
title: Extracting libs from a node.js project
subtitle: Publishing my metalsmith plugins
date: 2014-10-01
published: true
tags: 
- javascript
related:
- note_hello_world
---

[As promised](/2014/09/30/hello-world/), lets break out my customized plugins I've used with [metalsmith](http://metalsmith.io) to build up this site. This note will be a updated until I think the job is done.

Currenty the following plugins have already been published:
- [metalsmith-wordcount](#metalsmith-wordcount)

### How to extract logic into standalone packages

Before publishing, my custom metalsmith plugins lived in their respective `metalsmith-XXX.js` file within the same project directory. I simply required them in my `index.js` file. Now I'm moving them into their own package, so they can be reused in the future. Here's a quick overview on how to do that:
1. The first step was to set up a new package for each plugin.
2. `npm init` to get a proper one and install all dependent packages that you will need in the plugin.
3. Copy over all the code and point the `main` field in your `package.json` to the proper file.
4. `npm link` your new package to temporary locally use it within your root project ([see this](http://elegantcode.com/2011/12/16/taking-baby-steps-with-node-js-linking-local-packages-with-npm/)).
5. Test and finally publish it ([see this](https://gist.github.com/coolaj86/1318304)).

### metalsmith-wordcount
Are you curious about how the word count and estimated reading time are computed on my site? It's done via my plugin [metalsmith-wordcount](https://github.com/majodev/metalsmith-wordcount). It calculates the wordcount and average reading time of all paragraphs in a HTML file. 

[install from npm](https://www.npmjs.org/package/metalsmith-wordcount) · [source on github](https://github.com/majodev/metalsmith-wordcount)

### Further reading

- [How to link local packages](http://elegantcode.com/2011/12/16/taking-baby-steps-with-node-js-linking-local-packages-with-npm/)
- [How to publish to npm](https://gist.github.com/coolaj86/1318304)
- [How to write metalsmith plugins](https://gist.github.com/unstoppablecarl/d864d662c3f1a1688a91)