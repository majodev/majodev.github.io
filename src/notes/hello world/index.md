---
uid: note_hello_world
title: Hello World
date: 2014-09-30
published: true
tags:
- private
related:
- note_extracting_libs_node_projects
customMetaKeywords:
- first
- metalsmith
- CMS
- git
- filedriven
---

Hello World! You are reading the first published note on my shiny new site. Currently everything feels a bit empty, but I hope I can fill things up with useful information ASAP.

Out of curiosity I had to run a quick `git log --max-parents=0 HEAD` to see the initial commit date of this project. I was stunned when I realized that I've started development in the end of July. Time wents by so fast.

``` bash
$ git log --max-parents=0 HEAD
commit 431bb58894baa6d1590b4e27cc3d211f12fba5ac
Author: majodev
Date:   Wed Jul 23 22:29:33 2014 +0200

    initial commit
```

This site is not backed by any traditional blogging CMS (e.g. [Wordpress](http://wpde.org/), [Ghost](https://ghost.org/) or [Medium](https://medium.com/)). Instead I developed it from scratch and used the nifty little static site generator [metalsmith](http://metalsmith.io). This current "build" is therefore only a **bundle** containing minified HTML, CSS and JS, which I can deploy anywhere: No serverside logic or databases required, thus avoiding the most common security threats. Fundamentally, my development environment provides a poor man's barebones CMS. Most essential features:
* Templates in [Handlebars](http://handlebarsjs.com/), 
* Writing in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) and 
* A flat file hierarchy with [YAML](http://www.yaml.org/) frontmatter. 

If you are interested, feel free to checkout the [source code](https://github.com/majodev/majodev.github.io/), hosting is currently done though blazing fast [GitHub Pages](https://pages.github.com/) (which is free). I'm currently in the process of publishing all the plugins I've written for [metalsmith](http://metalsmith.io). ~~Check back later if you want some information on that.~~ [Publishing has begone.](/2014/10/01/extracting-libs-from-a-node-js-project/)

By the way, what do you think about my chosen domain *"ranf.tl"*? I think this variation of my surname is pretty neat, as it's very short and hopefully memorable (ranftl.com and ranftl.at were already taken). Futhermore I can finally equip my family with some handy & nice looking email addresses. Anyways, I'm glad you are able to read this and maybe you'll find something useful here in the next weeks. 

![I am out](i_am_out.gif)

Have some feedback on the design or structure? Please leave a comment below or catch me up on [twitter](http://twitter.com/majodev). If you are into RSS (or prefer platforms like [Feedly](https://feedly.com/)), feel free subscribe to my notes via [this Atom/RSS feed](/feed.xml).