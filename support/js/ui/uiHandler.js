var uiConfig = require("./uiConfig");
var $body = $(document.body);

uiConfig.init();

function pinHeader() {
  if (Headroom.cutsTheMustard) {
    $(".block-header").addClass("headroom-forceShow");
  }
}

function addCollapseOnClick() {
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

function init() {
  initHeadroom();
  addCollapseOnClick();
}

module.exports = {
  init: init,
  setPageLoading: setPageLoading,
  incPageLoadingProgress: incPageLoadingProgress
};