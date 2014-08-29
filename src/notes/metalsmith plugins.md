---
title: My metalsmith plugins
tags:
- javascript
---

Early the process of developing this website with [metalsmith](http://metalsmith.io) I came to the conclusion, that there is not a solution (*a plugin*) for every requirement I wanted to fulfill with metalsmith. Luckily, it's dead fucking easy to customize the metalsmith pipeline. Actually, it's so freaking easy, that I finally ended up with XXX (*yes, xxxx*) custom written plugins, which I want to share here with you! 

This post should give a kind of overview and some background information on how I was using them. I have published every one of them on GitHub, feel free to check them out there.

## metalsmith-collectiondefaults
Love metalsmith-collections? Fine, me too! But does every collection child need the same metadata key (e.g. `template: note.hbs`) in its `YAML`? How about adding default metadata to your collection children? Sold? Enjoy.

```javascript
Metalsmith(__dirname)
[...]
  .use(collections({ 
    notes: { // let's define our notes collection
      pattern: "notes/**/*.md"
    }
  }))
  .use(collectiondefaults({
    notes: { // let's give every note the same template
      template: "note.hbs"
    }
  }))
[...]
```

## metalsmith-filetimestamp
I only want to add a `date` field to my `YAML`, if I need to trick the reader (*yes, you!*) into thinking that page was published later than I originally created it. Hence, why not read the `createdAt` date from the filesystem, additionally, outputting the `lastModified` date of a page would also be a nice thing to have.

This plugin appends both of these keys to your metalsmith files' metadata.

``` javascript
Metalsmith(__dirname)
[...]
  .use(filetimestamp())
[...]
```

## metalsmith-firstparagraph

## metalsmith-hbs

## metalsmith-headingsidentifier

## metalsmith-highlightjs

## metalsmith-permapath

## metalsmith-tagtree

## metalsmith-wordcount

