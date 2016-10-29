---
uid: google-webfonts-helper
title: Self-Hosting Google Web Fonts
subtitle: Introducing google-webfonts-helper
date: 2014-12-23
published: true
tags:
- javascript
- project
customMetaKeywords:
- google
- web fonts
- font
- hosting
- local
- woff
- svg
- eot
- woff2
- ttf
- CSS
- snippet
lightbox: true
---

Let's get this straight: The effort to host Google web fonts on your own server is immense! First of all you need to download all `.eot`, `.woff`, `.woff2`, `.ttf` and `.svg` files, then copy them onto your server and finally paste a CSS snippet. 

Sounds easy? Well it *could* be, if Google *would actually provide* any direct links to download these files and a customized CSS for self-hosting them. To fix this problem without using font generation services like Font Squirrel, I decided to publish a little service called [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts).

### Update 2016-10-29

<a class="github-button" href="https://github.com/majodev/google-webfonts-helper" data-style="mega" data-count-href="/majodev/google-webfonts-helper/stargazers" data-count-api="/repos/majodev/google-webfonts-helper#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star majodev/google-webfonts-helper on GitHub">Star</a>

This *weekend* project has now reached close to **1500 stars** and was mentioned in various blogs (e.g. [Milan Aryal](https://milanaryal.com/self-hosting-google-web-fonts/)), newsletters and articles (e.g [T3N [german]](http://t3n.de/news/google-fonts-selber-hosten-751438/)). Seems like the project fills a need. 

As far as I can tell, its API gets even directly used by some companies, though this is still hosted on a single [free Heroku dyno](https://www.heroku.com/pricing) for about ~2 years now! So big THX to [Heroku](https://www.heroku.com/), you are awesome!

### Update 2015-01-12

Just for reference: Before creating this service I've used an [awesome bash script](https://neverpanic.de/blog/2014/03/19/downloading-google-web-fonts-for-local-hosting/) by Clemens Lang to download Google fonts in all formats. So Kudos to him, my service builds upon his idea!

### Update 2015-01-09

Your generated archive only includes required files based on selected styles, formats and charsets. 4-steps instruction. A special *Thank you* goes to the 212 stargazers, you are awesome!

### Update 2015-01-02

UI improvements, CSS code highlighting, step by step instructions.

### Update 2014-12-30

Font subsets (e.g. `latin`, `latin-ext`, `cyrillic`, ...) are now customizable.

### Update 2014-12-29

Seriously, I have not expected so much popularity: 169 stargazers. Thank you so much!

### Update 2014-12-27

Wow, this project has gone quite popular after submitting it to [Hackernews](https://news.ycombinator.com/item?id=8802395)! 33 stargazers and 35 comments (and rank 7 in the news section at peak time). Thank you!

### Example: Self-host *Open Sans* in [4 easy steps](https://google-webfonts-helper.herokuapp.com/fonts/open-sans?subsets=latin)!

The service uses Google's font API to retrieve a list of all available web fonts, fetches links to the `.eot`, `.woff`, `.woff2`, `.ttf` and `.svg` files by parsing their hosted CSS files (and faking the `User-Agent` to get them). It downloads all font formats and generates a customized archive with all your selected styles, formats and charsets. In combination with the CSS snippet (whose folder prefix can be customized) you should be ready to self-host your font immediately. Here's how this looks like currently:

![google-webfonts-helper overview image](/static/apps/google-webfonts-helper/full_view.png)

Internally, I'm using the (M)EAN stack (without MongoDB) as I really needed some practice with [Angular](https://angularjs.org/) and [Express](http://expressjs.com/). Restful services are great and I can recommend anyone starting up a small project like this to take a look at the [yeoman angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack) generator. Without prior knowledge, I came up with a working prototype in less than 5 hours! Freaking productive work flow.

Please leave comments here (preferred) or [on Hackernews](https://news.ycombinator.com/item?id=8802395) if you have any suggestions and take a look at the code on [GitHub](https://github.com/majodev/google-webfonts-helper).

<!-- star github count loader... -->
<script async defer src="https://buttons.github.io/buttons.js"></script>