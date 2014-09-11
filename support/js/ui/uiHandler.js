var NProgress = require("nprogress");

var uiConfig = require("./uiConfig");

var $body = $(document.body);
var $html = $("html");

uiConfig.init();

function pinHeader() {
  if (Headroom.cutsTheMustard) {
    $(".block-header").addClass("headroom-forceShow");
  }
}

function init() {
  initHeadroom();
  initCollapsing();
}

function initCollapsing() {
  // http://stackoverflow.com/questions/16680543/hide-twitter-bootstrap-nav-collapse-on-click
  $('.nav a').on('click', function() {
    if ($('.navbar-toggle').css('display') != 'none') {
      $(".navbar-toggle").trigger("click");
    }
  });
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
    offset: "0px",
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
    duration: 180,
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
  fadeOutContainer: fadeOutContainer
};