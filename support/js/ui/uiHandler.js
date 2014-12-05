var uiConfig = require("./uiConfig");
var lightbox = require("./lightbox");

// constants
var HEADER_CLASS = ".block-header";
var DEFAULT_NAV_OPACITY_FOCUS = 1;
var DEFAULT_FADE_MS = 200;


// runtime vars
var $header; // initialized @ init()


var startup = _.once(function() { // do this only once
  uiConfig.init();
});

function init() { // called per page ajax refresh and on init!
  startup();

  $header = $(HEADER_CLASS);
  initHeadNav();
  lightbox.init();
}

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

module.exports = {
  init: init
};