// var NProgress = require("nprogress");
var FastClickAttach = require("fastclick");
var viewportUnitsBuggyfill = require('viewport-units-buggyfill');

module.exports = {
  init: function() {

    $(function() {
      FastClickAttach(document.body);
    });

    // support for vh (e.g. 100 viewport height) in ios7 and ie8
    // viewportUnitsBuggyfill.init({contentHack: true}); 
    viewportUnitsBuggyfill.init(); 

    // NProgress.configure({
    //   showSpinner: false
    // });
    
  }
};