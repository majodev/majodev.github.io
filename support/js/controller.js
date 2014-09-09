var ajaxHandler = require("./ajax/ajaxHandler");
var uiHandler = require("./ui/uiHandler");

ajaxHandler.on("beforePageExchange", function() {
  // console.log("beforePageExchange");
  uiHandler.incPageLoadingProgress();
});

ajaxHandler.on("pageExchanged", function() {
  // console.log("pageExchanged");
  uiHandler.init();
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



module.exports = {
  init: function() {
    console.log("controller: init");
    ajaxHandler.init();
    uiHandler.init();
  }
};