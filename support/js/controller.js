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

module.exports = {
  init: init
};