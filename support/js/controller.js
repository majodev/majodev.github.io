var uiHandler = require("./ui/uiHandler");
var disqus = require("./plugins/disqus");
var linksTargetBlank = require("./sugar/linksTargetBlank");
var decryptEmail = require("./sugar/decryptEmail");
var analytics = require("./plugins/analytics");

// init is called on document.ready by main module!
function init() {
  decryptEmail();
  uiHandler.init();
  disqus.init();
  analytics.init();
  linksTargetBlank();
}

$(window).on("orientationchange", function() {
  // disqus needs to be resetted on changed orientation, else width is to wide
  // see http://stackoverflow.com/questions/16183397/how-to-reset-disqus-width-on-mobile-orientation-change
  disqus.reset();
});

module.exports = {
  init: init
};