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

Let's get this straight: The effort to host Google web fonts on your own server is immense! First of all you need to download all `.eot`, `.woff`, `.woff2`, `.ttf` and `.svg` files, then copy them onto your server and finally paste a CSS snippet. Sounds easy? Well it *could* be, if Google *would actually provide* any direct links to download these files and a customized CSS for self-hosting them. To fix this problem without using font generation services like Font Squirrel, I decided to publish a little service called [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts).

### Example: Self-host *Open Sans* in [5 easy steps](https://google-webfonts-helper.herokuapp.com/fonts/open-sans?subsets=latin)!

The service uses Google's font API to retrieve a list of all available web fonts, fetches links to the `.eot`, `.woff`, `.woff2`, `.ttf` and `.svg` files by parsing their hosted CSS files (and faking the `User-Agent` to get them). It downloads all font formats and generates a customized archive with all your selected styles, formats and charsets. In combination with the CSS snippet (whose folder prefix can be customized) you should be ready to self-host you font immediately. Here's how this looks like currently:

![google-webfonts-helper overview image](/static/apps/google-webfonts-helper/full_view.png)

Internally, I'm using the (M)EAN stack (without MongoDB) as I really needed some practice with [Angular](https://angularjs.org/) and [Express](http://expressjs.com/). Restful services are great and I can recommend anyone starting up a small project like this to take a look at the [yeoman angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack) generator. Without prior knowledge, I came up with a working prototype in less than 5 hours! Freaking productive work flow.

Please leave comments here (preferred) or [on Hackernews](https://news.ycombinator.com/item?id=8802395) if you have any suggestions and take a look at the code on [GitHub](https://github.com/majodev/google-webfonts-helper).

**EDIT 2014-12-27:** Wow, this project has gone quite popular after submitting it to [Hackernews](https://news.ycombinator.com/item?id=8802395)! 33 stargazers and 35 comments (and rank 7 in the news section at peak time). Thank you!

**EDIT 2014-12-29:** Seriously, I have not expected so much popularity: 169 stargazers. Thank you so much!

**EDIT 2014-12-30:** Font subsets (e.g. `latin`, `latin-ext`, `cyrillic`, ...) are now customizable.

**EDIT 2015-01-02:** UI improvements, CSS code highlighting, step by step instructions.

**EDIT 2015-01-09:** Your generated archive only includes required files based on selected styles, formats and charsets. 5-steps instruction. A special *Thank you* goes to the 211 stargazers, you are awesome! 