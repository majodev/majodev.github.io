var async = require("async");

var ajaxHandler = require("./ajax/ajaxHandler");
var uiHandler = require("./ui/uiHandler");
var disqus = require("./plugins/disqus");
var cheat = require("./sugar/cheat");
var stopPageScripts = require("./sugar/stopPageScripts");
var cssInjector = require("./sugar/cssInjector");
var decryptEmail = require("./sugar/decryptEmail");
var analytics = require("./plugins/analytics");

// init is called on document.ready by main module!
function init() {
  decryptEmail();
  ajaxHandler.init();
  uiHandler.init();
  disqus.init();
  analytics.init();
}

ajaxHandler.on("beforePageExchange", function(options) {

  // console.log("beforePageExchange");

  stopPageScripts();

  uiHandler.fadeOutContainer(function() {
    
    uiHandler.incPageLoadingProgress();
    
    async.parallel([
        function(callback) {
          uiHandler.scrollTop(callback);
        },
        function(callback) {
          cssInjector.removeCSSFromMeta();
          cssInjector.injectCSSIntoMeta(options.$newHTML, callback);
        }
      ],
      function(err, results) {
        if (err) {
          console.error("async beforePageExchange error" + err);
        }

        uiHandler.incPageLoadingProgress();
        options.callback();
      }
    );
  });

});

ajaxHandler.on("pageExchanged", function(options) {
  // console.log("pageExchanged");
  // console.log(options);
  decryptEmail();
  uiHandler.init();
  analytics.pageview(options.path, options.title);
  disqus.reset();
});

ajaxHandler.on("loadingStart", function() {
  // console.log("loadingStart");
  uiHandler.setPageLoading(true);
});

ajaxHandler.on("loadingProgress", function(progressValue) {
  // console.log("loadingProgress: " + progressValue);
  uiHandler.incPageLoadingProgress();
});

ajaxHandler.on("loadingEnd", function() {
  // console.log("loadingEnd");
  uiHandler.setPageLoading(false);
});

ajaxHandler.on("triedSameUrlLoading", function() {
  // console.log("triedSameUrlLoading");
  uiHandler.scrollTop();
});

ajaxHandler.on("attachedAnchor", function(options) {
  // console.log("attachedAnchor");
  uiHandler.scrollToAnchor(options.anchorname, options.callback);
});

ajaxHandler.on("loadingError", function() {
  // console.log("loadingError");
  document.location.href = "/404.html";
});

cheat.on("executed", function() {
  alert("All your base are belong to us!");
});

module.exports = {
  init: init
};