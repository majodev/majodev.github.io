---
uid: valgrind-yosemite
title: Valgrind on Mac OS X 10.10 Yosemite
subtitle: Install procedure (SVN trunk unstable)
date: 2014-11-28
published: true
tags:
- c
- programming
customMetaKeywords:
- c
- valgrind
- yosemite
- installation
---

You want to hack with C and [Valgrind](http://valgrind.org/) on OS X 10.10 Yosemite? Well, you'll definitely run into problems getting [Valgrind](http://valgrind.org/) for this very platform, as there is [no official stable release out there yet](http://sourceforge.net/p/valgrind/mailman/message/33047840/). Consequentially these is no receipt for [Homebrew](http://brew.sh/) (which is great anyways, get it!), hence you need to manually build that nifty tool  from the latest `trunk` SVN repository.

Here's how to do that (needs installation of [Xcode Command Line Tools](http://railsapps.github.io/xcode-command-line-tools.html)):

``` bash
# Check out their repo...
$ svn co svn://svn.valgrind.org/valgrind/trunk valgrind-trunk
# and hop into it.
$ cd valgrind-trunk

# You need to have autoconf and automake installed to build Valgrind
# This example uses Homebrew to install these dependencies
# (MacPorts should also work)
# (Permission error? add sudo!)
$ brew install automake
$ brew install autoconf

# run autogen.sh in valgrind-trunk
$ ./autogen.sh

# Tricky, there are some hard wired paths in the Valgrind sources.
# You need to symlink the mach folder in your XCode SDK to /usr/include/mach
# Be sure to use the proper Xcode SDK "MacOSX10.10.sdk" in the path!
$ ln -sv /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk/usr/include/mach /usr/include/mach

# Run configure + set install paths in valgrind-trunk
$ ./configure --prefix=/usr/local

# Run Make and make install (permission error? add sudo!) in valgrind-trunk
$ ./make
$ ./make install

# Check it works
$ valgrind --version
valgrind-3.11.0.SVN

```

Still on OS X 10.9 Mavericks? Then you might want to check out [Calvin's great How-To](http://calvinx.com/2014/05/04/valgrind-on-mac-os-x-10-9-mavericks/).  
Background: Currently relearning [C the hard way](http://c.learncodethehardway.org/book/).