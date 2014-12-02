var urlHelper = require("../ajax/urlHelper");

module.exports = function linksTargetBlank() {
  $("a").each(function(item) {
    var $self = $(this);
    if (urlHelper.testSameOrigin($self.attr("href")) === false && 
      $self.attr("href").indexOf("mailto:") !== 0 &&
      $self.attr("href").indexOf("skype:") !== 0) {

      $self.attr("target", "_blank");
    }
  });
};