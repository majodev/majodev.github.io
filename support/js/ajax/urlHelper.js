function hasAnchor(url) {
  if (url.indexOf("#") !== -1) {
    return true;
  }
  return false;
}

function removeAnchorFromUrl(url) {
  return url.split("#")[0];
}

function getAnchor(url) {
  return url.split("#")[1];
}

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

function isProhibitedExtension(url) {
  var extension = getExtension(getPath(url)).toLowerCase();
  // only no extension or .html is allowed to be ajaxed
  if (extension === "" || extension === ".html") {
    return false;
  } else {
    return true;
  }
}

function getExtension(url) {
  // http://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
  return url.substr((~-url.lastIndexOf(".") >>> 0) + 2);
}

function getPath(url) {
  // http://stackoverflow.com/questions/441755/regular-expression-to-remove-hostname-and-port-from-url
  return /^.*?:\/\/.*?(\/.*)$/.exec(url)[1];
}

function hasTargetBlank(anchor) {
  return $(anchor).attr("target") === "_blank";
}

module.exports = {
  hasAnchor: hasAnchor,
  removeAnchorFromUrl: removeAnchorFromUrl,
  getAnchor: getAnchor,
  testSameOrigin: testSameOrigin,
  isProhibitedExtension: isProhibitedExtension,
  hasTargetBlank: hasTargetBlank
};