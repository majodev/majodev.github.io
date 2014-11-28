---
uid: note_extracting_libs_node_projects
title: Extracting Libs from a Node.js Project
subtitle: Publishing my Metalsmith Plugins (UPDATE 3)
date: 2014-10-01
published: true
tags:
- javascript
- programming
related:
- note_hello_world
lightbox: true
customMetaKeywords:
- metalsmith
- plugins
- open source
- npm
- github
- metalsmith-word-count
- metalsmith-headings-identifier
- metalsmith-data-markdown
- standalone
---

[As promised][helloworld], lets break out my customized plugins I've used with [metalsmith][metalsmith] to build up this site. I had to rename them ([see this pull request](https://github.com/segmentio/metalsmith.io/pull/61)) in order to be allowed to publish them on [metalsmith.io][metalsmith] (UPDATE 4).

I've published these plugins:
- [metalsmith-word-count](#metalsmith-word-count)
- [metalsmith-headings-identifier](#metalsmith-headings-identifier) (UPDATE 1)
- [metalsmith-data-markdown](#metalsmith-data-markdown) (UPDATE 2)

### How to extract logic into standalone packages

Before publishing, my custom metalsmith plugins lived in their respective `metalsmith-XXX.js` file within the same project directory. I simply required them in my `index.js` file. Now I'm moving them into their own package, so they can be reused in the future. Here's a quick overview on how to do that:
1. The first step was to set up a new package for each plugin.
2. `npm init` to get a proper one and install all dependent packages that you will need in the plugin.
3. Copy over all the code and point the `main` field in your `package.json` to the proper file. Attention, don't forget do install all required dependencies!
4. `npm link` your new package to temporary [locally use it within your root project][localpkg].
5. Test and [finally publish it][pubnpm].

### metalsmith-word-count
Are you curious about how the word count and estimated reading time are computed on my site? It's done via my plugin [metalsmith-word-count][metalsmith-word-count-github]. It calculates the wordcount and average reading time of all paragraphs in a HTML file.

[install from npm][metalsmith-word-count-npm] · [source on github][metalsmith-word-count-github]

### metalsmith-headings-identifier
Do you want to automatically turn your markdown headings (`h1-h6`) into clickable permalinks? Then grab [metalsmith-headings-identifier][metalsmith-headings-identifier-github]. This idea is originally by [Remy Sharp](http://remysharp.com/2014/08/08/automatic-permalinks-for-blog-posts), with the difference, that it's now done during generation time with [metalsmith][metalsmith].

![headingsidentifier example picture](headingsidentifierSample.png)

[install from npm][metalsmith-headings-identifier-npm] · [source on github][metalsmith-headings-identifier-github]

### metalsmith-data-markdown

[Inspired by Paul Irish's work](https://gist.github.com/paulirish/1343518) to use markdown within HTML tags, here comes *"something similar" (not as sophisticated)* wrapped in a metalsmith plugin. Now you can use `data-markdown` attributes to identify tags, that wrap markdown content and need to be converted to HTML during generation time.

[install from npm][metalsmith-data-markdown-npm] · [source on github][metalsmith-data-markdown-github]

### Further reading

- [Taking Baby Steps with Node.js – Linking Local Packages with npm][localpkg]
- [Getting Started with NPM (as a developer)][pubnpm]
- [How to write metalsmith plugins][metalsplughow]

<!-- libs -->

[metalsmith-word-count-npm]: https://www.npmjs.org/package/metalsmith-word-count "metalsmith-word-count on npm"
[metalsmith-word-count-github]: https://github.com/majodev/metalsmith-word-count "metalsmith-word-count on github"

[metalsmith-headings-identifier-npm]: https://www.npmjs.org/package/metalsmith-headings-identifier "metalsmith-headings-identifier on npm"
[metalsmith-headings-identifier-github]: https://github.com/majodev/metalsmith-headings-identifier "metalsmith-headings-identifier on github"

[metalsmith-data-markdown-npm]: https://www.npmjs.org/package/metalsmith-data-markdown "metalsmith-data-markdown on npm"
[metalsmith-data-markdown-github]: https://github.com/majodev/metalsmith-data-markdown "metalsmith-data-markdown on github"


<!-- internal links -->

[helloworld]: /2014/09/30/hello-world/ "Hello World"


<!-- external links -->

[metalsmith]: http://metalsmith.io "Official metalsmith website"

[localpkg]: http://elegantcode.com/2011/12/16/taking-baby-steps-with-node-js-linking-local-packages-with-npm/ "Taking Baby Steps with Node.js – Linking Local Packages with npm"

[pubnpm]: https://gist.github.com/coolaj86/1318304 "Getting Started with NPM (as a developer)"

[metalsplughow]: https://gist.github.com/unstoppablecarl/d864d662c3f1a1688a91 "How to write metalsmith plugins"
