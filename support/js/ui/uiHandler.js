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

function unPinHeader() {
  if (Headroom.cutsTheMustard) {
    $(".block-header").removeClass("headroom-forceShow");
  }
}

function init() {
  initHeadroom();
  initCollapsing();
}

function initCollapsing() {
  var defaultNavBG = "#fefefe";
  var defaultNavOpacity = 0.8;
  var defaultNavOpacityFocused = 1;
  var defaultsOverwritten = false;
  var fadeDurationMS = 200;


  // http://stackoverflow.com/questions/16680543/hide-twitter-bootstrap-nav-collapse-on-click
  $('.nav a').on('click', function() {
    if ($('.navbar-toggle').css('display') != 'none') {
      $(".navbar-toggle").trigger("click");
    }
  });

  if (_.isUndefined($(".block-header").data("backgroundcolor")) === false) {
    //console.log("custom backgroundcolor");
    defaultNavBG = $(".block-header").data("backgroundcolor");
    defaultsOverwritten = true;
  }

  if (_.isUndefined($(".block-header").data("backgroundalpha")) === false) {
    //console.log("custom backgroundalpha");
    defaultNavOpacity = Number($(".block-header").data("backgroundalpha"));
    defaultsOverwritten = true;
  }

  if (defaultsOverwritten) {
    //console.log("defaultsOverwritten");
    $(".block-header").velocity({
      backgroundColor: defaultNavBG,
      backgroundColorAlpha: defaultNavOpacity
    });
  }

  $('.navbar').on('show.bs.collapse', function() {
    pinHeader();
    $(".block-header").velocity({
      backgroundColor: defaultNavBG,
      backgroundColorAlpha: defaultNavOpacityFocused
    }, {
      duration: fadeDurationMS
    });
    //console.log("show collapse");
  });

  $('.navbar').on('hide.bs.collapse', function() {
    unPinHeader();
    $(".block-header").velocity({
      backgroundColor: defaultNavBG,
      backgroundColorAlpha: defaultNavOpacity
    }, {
      duration: fadeDurationMS
    });
    //console.log("hide collapse");
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
    offset: "-50", // include header offset
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
    duration: 200,
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