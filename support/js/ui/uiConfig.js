var NProgress = require("nprogress");
var FastClickAttach = require("fastclick");

module.exports = {
  init: function() {
    $(function() {
      FastClickAttach(document.body);
    });

    NProgress.configure({
      showSpinner: true,
      minimum: 0.2,
      trickleRate: 0.01,
      trickleSpeed: 100
    });
  }
};