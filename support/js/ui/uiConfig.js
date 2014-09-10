var NProgress = require("nprogress");

module.exports = {
  init: function() {
    $(function() {
      FastClick.attach(document.body);
    });

    NProgress.configure({
      showSpinner: true,
      minimum: 0.2,
      trickleRate: 0.01,
      trickleSpeed: 100
    });
  }
};