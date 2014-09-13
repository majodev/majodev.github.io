var NProgress = require("nprogress");

var uiConfig = require("./uiConfig");

var $body = $(document.body);
var $html = $("html");

uiConfig.init(); // only once

// runtime vars
var defaultNavStyleOverwritten = false;
var defaultNavStyleBG = "#fefefe";
var defaultNavStyleOpacity = 0.8;
var defaultNavStyleOpacityFocused = 1;
var defaultFadeDuration = 200;
var defaultHeaderOffset = 50;



function pinHeader() {
  if (Headroom.cutsTheMustard) {
    $(".block-header").addClass("headroom-forceShow");
  }
}

function unPinHeader() {
  if (Headroom.cutsTheMustard) {
    $(".block-header").removeClass("headroom-forceShow");
  }
}

function init() { // called per page ajax refresh and on init!
  initHeadroom();
  initNavigation();
}

function initNavigation() {
  var currentNavBG = defaultNavStyleBG;
  var currentNavOpacity = defaultNavStyleOpacity;
  var currentNavOpacityFocused = defaultNavStyleOpacityFocused;


  // http://stackoverflow.com/questions/16680543/hide-twitter-bootstrap-nav-collapse-on-click
  $('.nav a').on('click', function() {
    if ($('.navbar-toggle').css('display') != 'none') {
      $(".navbar-toggle").trigger("click");
    }
  });

  if (_.isUndefined($(".block-header").data("backgroundcolor")) === false) {
    //console.log("custom backgroundcolor");
    currentNavBG = $(".block-header").data("backgroundcolor");
    defaultNavStyleOverwritten = true;
  }

  if (_.isUndefined($(".block-header").data("backgroundalpha")) === false) {
    //console.log("custom backgroundalpha");
    currentNavOpacity = Number($(".block-header").data("backgroundalpha"));
    defaultNavStyleOverwritten = true;
  }

  if (defaultNavStyleOverwritten) {
    //console.log("defaultNavStyleOverwritten");
    $(".block-header").velocity({
      backgroundColor: currentNavBG,
      backgroundColorAlpha: currentNavOpacity
    });
  }

  $('.navbar').on('show.bs.collapse', function() {
    pinHeader();
    $(".block-header").velocity({
      backgroundColor: currentNavBG,
      backgroundColorAlpha: currentNavOpacityFocused
    }, {
      duration: defaultFadeDuration
    });
    //console.log("show collapse");
  });

  $('.navbar').on('hide.bs.collapse', function() {
    unPinHeader();
    $(".block-header").velocity({
      backgroundColor: currentNavBG,
      backgroundColorAlpha: currentNavOpacity
    }, {
      duration: defaultFadeDuration
    });
    //console.log("hide collapse");
  });


  fixNavIOSHoverBug();
}

function resetNavStyle(callback) {
  if(defaultNavStyleOverwritten === false) {
    callback(null);
  } else {
    $(".block-header").velocity({
      backgroundColor: defaultNavStyleBG,
      backgroundColorAlpha: defaultNavStyleOpacity
    }, {
      duration: defaultFadeDuration,
      complete: function () {
        defaultNavStyleOverwritten = false;
        callback(null);
      }
    });
  }
}

function fixNavIOSHoverBug() {
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

function initHeadroom() {
  // `Headroom.cutsTheMustard` is only true if browser supports all features required by headroom.
  // By guarding your code with this condition, the widget will safely degrade
  // https://github.com/WickyNilliams/headroom.js/issues/64
  if (Headroom.cutsTheMustard) {
    $(".block-header").headroom();
  }
}

function setPageLoading(value) {
  if (value === true) {
    NProgress.start();
    $body.addClass('loading');
    pinHeader();
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
    offset: "-" + defaultHeaderOffset, // include header offset
    complete: function(elements) {
      $anchor.addClass("targetAnimation");
      $anchor.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        $anchor.removeClass("targetAnimation");
      });
      if (_.isFunction(callback) === true) {
        callback(null);
      }
    }
  });
}

function fadeOutContainer(callback) {
  $(".uiHandlerFade").velocity("fadeOut", {
    duration: defaultFadeDuration,
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