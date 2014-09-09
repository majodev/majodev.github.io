var ajaxHandler = require("./ajaxHandler");
var uiHelper = require("./uiHelper");

ajaxHandler.on("beforePageExchange", function() {
  console.log("beforePageExchange");
  uiHelper.incPageLoadingProgress();
});

ajaxHandler.on("pageExchanged", function() {
  console.log("pageExchanged");
  uiHelper.init();
});

ajaxHandler.on("loadingStart", function() {
  console.log("loadingStart");
  uiHelper.setPageLoading(true);
});

ajaxHandler.on("loadingProgress", function(progressValue) {
  console.log("loadingProgress: " + progressValue);
  uiHelper.incPageLoadingProgress(progressValue);
});

ajaxHandler.on("loadingEnd", function() {
  console.log("loadingEnd");
  uiHelper.setPageLoading(false);
});



module.exports = {
  init: function() {
    console.log("controller: init");
    ajaxHandler.init();
    uiHelper.init();
  }
};