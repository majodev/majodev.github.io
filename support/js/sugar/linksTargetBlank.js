// via http://stackoverflow.com/questions/9404793/check-if-same-origin-policy-applies
function testSameOrigin(url) {
  var loc = window.location,
    a = document.createElement('a');

  var realPortLoc = loc.port;
  var realPortUrl;

  if (realPortLoc.trim() === "") {
    realPortLoc = "80"; // catch IE problem, not knowing the actual port oO
  }

  a.href = url;
  realPortUrl = a.port;

  if (a.port.trim() === "") {
    realPortUrl = "80"; // catch chrome windows problem, not knowing the actual port of a created anchor oO
  }

  return a.hostname == loc.hostname &&
    realPortUrl == realPortLoc &&
    a.protocol == loc.protocol;
}

module.exports = function linksTargetBlank() {
  $("a").each(function(item) {
    var $self = $(this);
    if (testSameOrigin($self.attr("href")) === false && 
      $self.attr("href").indexOf("mailto:") !== 0 &&
      $self.attr("href").indexOf("skype:") !== 0) {

      $self.attr("target", "_blank");
    }
  });
};