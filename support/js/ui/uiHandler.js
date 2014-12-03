var NProgress = require("nprogress");
var coolAsciiFaces = require("cool-ascii-faces");

var uiConfig = require("./uiConfig");
var lightbox = require("./lightbox");

// constants
var HEADER_CLASS = ".block-header";
var DEFAULT_NAV_OPACITY_FOCUS = 1;
var DEFAULT_FADE_MS = 200;
var DEFAULT_HEAD_HEIGHT = 50;


// runtime vars
var $body = $(document.body);
var $html = $("html");
var $header; // initialized @ init()
var defaultNavStyleOverwritten = false;
// var headroomEnabled = false;


var startup = _.once(function() { // do this only once
  uiConfig.init();
});

function init() { // called per page ajax refresh and on init!
  startup();

  $header = $(HEADER_CLASS);
  // initHeadroom();
  initHeadNav();
  initFooterSmily();
  lightbox.init();
}

function initFooterSmily() {
  $(".block-footerBottomText").on("click", function() {
    $(this).velocity({
      translateY: "200%"
    }, {
      complete: function() {
        $(this).text(coolAsciiFaces());
        $(this).velocity({
          translateY: "0%"
        });
      }
    });

  });
}

// function initHeadroom() {
//   $header = $(HEADER_CLASS);
//   if (Headroom.cutsTheMustard) {
//     headroomEnabled = true;
//     // `Headroom.cutsTheMustard` is only true if browser supports all features required by headroom.
//     // By guarding your code with this condition, the widget will safely degrade
//     // https://github.com/WickyNilliams/headroom.js/issues/64
//     $header.headroom({
//       offset: 0
//     });
//   }
// }

function initHeadNav() {
  // http://stackoverflow.com/questions/16680543/hide-twitter-bootstrap-nav-collapse-on-click
  $('.nav a').on('click', function() {
    if ($('.navbar-toggle').css('display') != 'none') {
      $(".navbar-toggle").trigger("click");
    }
  });

  $('.navbar').on('show.bs.collapse', function() {
    // forceHeadroomShow();
    $header.velocity({
      backgroundColorAlpha: DEFAULT_NAV_OPACITY_FOCUS
    }, {
      duration: DEFAULT_FADE_MS
    });
  });

  $('.navbar').on('hide.bs.collapse', function() {
    // unforceHeadroomShow();
    $header.removeAttr('style');
  });

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

// function forceHeadroomShow() {
//   if (headroomEnabled) {
//     $header.addClass("headroom-forceShow");
//   }
// }

// function unforceHeadroomShow() {
//   if (headroomEnabled) {
//     $header.removeClass("headroom-forceShow");
//   }
// }

// function showHeadroomNow() { // bug, does not always work!
//   if (headroomEnabled) {
//     $header.addClass("headroom--pinned");
//     $header.removeClass("headroom--unpinned");
//   }
// }

var loadingTimeout;

function setPageLoading(value) {
  if (value === true) {
    NProgress.start();
    hackSafariToShowFillColorAnim();
    clearTimeout(loadingTimeout);
    $body.addClass('loading');
    // forceHeadroomShow();
  } else {
    NProgress.done(true);
    loadingTimeout = setTimeout(function() {
      $body.removeClass('loading');
    }, 500);
  }
}

function hackSafariToShowFillColorAnim() {
  // safari is weird and only shows fill animations if fill style is set directly.
  $(".iconic-brain-hemisphere-right, .iconic-brain-hemisphere-left").velocity({
    fill: "inherit"
  });
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
      // showHeadroomNow();
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

function unbind() {
  lightbox.unbind();
}

module.exports = {
  init: init,
  unbind: unbind,
  setPageLoading: setPageLoading,
  incPageLoadingProgress: incPageLoadingProgress,
  scrollTop: scrollTop,
  scrollToAnchor: scrollToAnchor,
  fadeOutContainer: fadeOutContainer
};