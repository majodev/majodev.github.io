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

  a.href = url;

  return a.hostname == loc.hostname &&
    a.port == loc.port &&
    a.protocol == loc.protocol;
}

module.exports = {
  hasAnchor: hasAnchor,
  removeAnchorFromUrl: removeAnchorFromUrl,
  getAnchor: getAnchor,
  testSameOrigin: testSameOrigin
};