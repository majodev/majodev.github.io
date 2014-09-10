var ajaxHandler = require("./ajax/ajaxHandler");
var uiHandler = require("./ui/uiHandler");
var disqus = require("./plugins/disqus");
var cheat = require("./sugar/cheat");
var stopPageScripts = require("./sugar/stopPageScripts");
var cssInjector = require("./sugar/cssInjector");

// init is called on document.ready by main module!
function init() {
  // console.log("controller: init");
  ajaxHandler.init();
  uiHandler.init();
  disqus.init();
}

ajaxHandler.on("beforePageExchange", function(options) {
  // console.log("beforePageExchange");
  uiHandler.incPageLoadingProgress();
  stopPageScripts();
  uiHandler.incPageLoadingProgress();
  uiHandler.scrollTop(options.callback);
  uiHandler.incPageLoadingProgress();
  cssInjector.removeCSSFromMeta();
  uiHandler.incPageLoadingProgress();
  cssInjector.injectCSSIntoMeta(options.$newHTML);
  uiHandler.incPageLoadingProgress();
});

ajaxHandler.on("pageExchanged", function() {
  // console.log("pageExchanged");
  uiHandler.init();
  disqus.reset();
});

ajaxHandler.on("loadingStart", function() {
  // console.log("loadingStart");
  uiHandler.setPageLoading(true);
});

ajaxHandler.on("loadingProgress", function(progressValue) {
  // console.log("loadingProgress: " + progressValue);
  uiHandler.incPageLoadingProgress(progressValue);
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
  alert("cheat executed!");
});

module.exports = {
  init: init
};