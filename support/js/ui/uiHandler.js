var NProgress = require("nprogress");
var uiConfig = require("./uiConfig");

// constants
var HEADER_CLASS = ".block-header";
var DEFAULT_NAV_BG = "#fefefe";
var DEFAULT_NAV_OPACITY = 0.8;
var DEFAULT_NAV_OPACITY_FOCUS = 1;
var DEFAULT_FADE_MS = 200;
var DEFAULT_HEAD_HEIGHT = 50;


// runtime vars
var $body = $(document.body);
var $html = $("html");
var $header; // initialized @ init()
var defaultNavStyleOverwritten = false;


var startup = _.once(function() { // do this only once
  uiConfig.init();
});

function init() { // called per page ajax refresh and on init!
  startup();

  initHead();
  initNav();
}

function initHead() {
  $header = $(HEADER_CLASS);
  if (Headroom.cutsTheMustard) {
    // `Headroom.cutsTheMustard` is only true if browser supports all features required by headroom.
    // By guarding your code with this condition, the widget will safely degrade
    // https://github.com/WickyNilliams/headroom.js/issues/64
    $header.headroom();
  }
}

function initNav() {

  // http://stackoverflow.com/questions/16680543/hide-twitter-bootstrap-nav-collapse-on-click
  $('.nav a').on('click', function() {
    if ($('.navbar-toggle').css('display') != 'none') {
      $(".navbar-toggle").trigger("click");
    }
  });

  setNavStyle();
  navFixIOSHoverBug();
}

function setNavStyle() {
  var currentNavBG = DEFAULT_NAV_BG;
  var currentNavOpacity = DEFAULT_NAV_OPACITY;
  var currentNavOpacityFocused = DEFAULT_NAV_OPACITY_FOCUS;

  if (_.isUndefined($header.data("backgroundcolor")) === false) {
    //console.log("custom backgroundcolor");
    currentNavBG = $header.data("backgroundcolor");
    defaultNavStyleOverwritten = true;
  }

  if (_.isUndefined($header.data("backgroundalpha")) === false) {
    //console.log("custom backgroundalpha");
    currentNavOpacity = Number($header.data("backgroundalpha"));
    defaultNavStyleOverwritten = true;
  }

  if (defaultNavStyleOverwritten) {
    //$header.css("background-color", "rgba(0, 0, 0, 0)");
    //console.log("defaultNavStyleOverwritten");
    $header.velocity({
      backgroundColor: currentNavBG,
      backgroundColorAlpha: 0
    }, {
      duration: 0,
      complete: function() {
        $header.velocity({
          backgroundColor: currentNavBG,
          backgroundColorAlpha: currentNavOpacity
        }, {
          delay: DEFAULT_FADE_MS*3,
          duration: DEFAULT_FADE_MS*4
        });
      }
    });
  }

  $('.navbar').on('show.bs.collapse', function() {
    forceHeadroomShow();
    $header.velocity({
      backgroundColor: currentNavBG,
      backgroundColorAlpha: currentNavOpacityFocused
    }, {
      duration: DEFAULT_FADE_MS
    });
    //console.log("show collapse");
  });

  $('.navbar').on('hide.bs.collapse', function() {
    unforceHeadroomShow();
    $header.velocity({
      backgroundColor: currentNavBG,
      backgroundColorAlpha: currentNavOpacity
    }, {
      duration: DEFAULT_FADE_MS
    });
    //console.log("hide collapse");
  });
}

function resetNavStyle(callback) {
  if (defaultNavStyleOverwritten === false) {
    callback(null);
  } else {
    $header.velocity({
      backgroundColor: DEFAULT_NAV_BG,
      backgroundColorAlpha: DEFAULT_NAV_OPACITY
    }, {
      duration: DEFAULT_FADE_MS,
      complete: function() {
        defaultNavStyleOverwritten = false;
        callback(null);
      }
    });
  }
}

function navFixIOSHoverBug() {
  // fixes ios hover bug on navbar links!
  // http://stackoverflow.com/questions/17233804/how-to-prevent-sticky-hover-effects-for-buttons-on-touch-devices
  // http://stackoverflow.com/questions/3120497/safari-iphone-ipad-mouse-hover-on-new-link-after-prior-one-is-replaced-with-ja
  if (_.isUndefined(window.ontouchstart) === false) { // handle touch device issue

    _.each($(".navbar-nav a"), function(linkItem) {
      var $navLink = $(linkItem);
      var orgContent = $navLink.html();

      $navLink.hide();
      $navLink.html("");

      //$navLink.html($navLink.text());

      setTimeout(function() {
        $navLink.html(orgContent);
        $navLink.show();
      }, 10);
    });
  }
}

function forceHeadroomShow() {
  if (Headroom.cutsTheMustard) {
    $header.addClass("headroom-forceShow");
  }
}

function unforceHeadroomShow() {
  if (Headroom.cutsTheMustard) {
    $header.removeClass("headroom-forceShow");
  }
}

function showHeadroomNow() { // bug, does not always work!
  if (Headroom.cutsTheMustard) {
    $header.addClass("headroom--pinned");
    $header.removeClass("headroom--unpinned");
  }
}

function setPageLoading(value) {
  if (value === true) {
    NProgress.start();
    $body.addClass('loading');
    forceHeadroomShow();
  } else {
    NProgress.done(true);
    $body.removeClass('loading');
  }
}

function incPageLoadingProgress(value) {
  if (typeof value !== "undefined") {
    if (NProgress.status > value) { // dont progress back!
      NProgress.inc();
    } else {
      NProgress.set(value);
    }
  } else {
    NProgress.inc();
  }
}

function scrollTop(callback) {
  $html.velocity("scroll", {
    offset: "0",
    complete: function(elements) {
      if (_.isFunction(callback) === true) {
        callback();
      }
    }
  });
}

function scrollToAnchor(anchorname, callback) {

  var $anchor = $("#" + anchorname);

  $anchor.velocity("scroll", {
    offset: "-" + DEFAULT_HEAD_HEIGHT, // include header offset
    complete: function(elements) {
      $anchor.addClass("targetAnimation");
      $anchor.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        $anchor.removeClass("targetAnimation");
      });
      showHeadroomNow();
      if (_.isFunction(callback) === true) {
        callback(null);
      }
    }
  });
}

function fadeOutContainer(callback) {
  $(".uiHandlerFade").velocity("fadeOut", {
    duration: DEFAULT_FADE_MS,
    complete: function() {
      if (_.isFunction(callback) === true) {
        callback(null);
      }
    }
  });
}

module.exports = {
  init: init,
  setPageLoading: setPageLoading,
  incPageLoadingProgress: incPageLoadingProgress,
  scrollTop: scrollTop,
  scrollToAnchor: scrollToAnchor,
  fadeOutContainer: fadeOutContainer,
  resetNavStyle: resetNavStyle
};