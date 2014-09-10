var dominject = require("dominject");


function checkLinkIsRelevant($link) {
  // ATTENTION: only links (to css files) with an set "id" property
  // will be dynamically injected, activated and deactivated!
  // static is hence untouched as it has no id!

  if ($link.prop("id") !== "") {
    return true;
  }
  return false;
}

function injectUrl(url) {
  var element = _.isUndefined(document.getElementById(url)) ? null : document.getElementById(url);

  if (element !== null) {
    $(element).prop('disabled', false);
    console.log("enabled " + $(element).prop("id"));
  } else {
    element = dominject({
      type: "style",
      url: url,
      attrs: {
        type: "text/css"
      }, // attributes to be added to the injected dom element
      timeout: 60 * 1000, // defaults to one minute that is allowed before the injection times out
      next: function(err, el) {
        console.log("injected " + $(element).prop("id"));
      }
    });
  }
}


module.exports = {
  injectCSSIntoMeta: function($newHTML) {

    var cssLinks = $($newHTML).filter("link");

    _.each(cssLinks, function(link) {
      var $link = $(link);
      if (checkLinkIsRelevant($link) === true) {
        injectUrl($link.prop("id"));
      }
    });
  },
  removeCSSFromMeta: function() {

    _.each($("link"), function(linkItem) {
      var $linkItem = $(linkItem);
      if (checkLinkIsRelevant($linkItem) === true && $linkItem.prop('disabled') === false) {
        $linkItem.prop('disabled', true);
        console.log("disabled " + $linkItem.prop("id"));
      }
    });

  }
};