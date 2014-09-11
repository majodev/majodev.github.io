var dominject = require("dominject");

// ATTENTION: only links (to css files) with an set "data-cssinjector" property
// to "dynamic" will be dynamically injected, activated and deactivated!
// "data-cssinjector=static" is hence untouched (and also should have no ID set!)
var DATA_ATTRIBUTE = "cssinjector";
var DATA_FLAG_DYNAMIC = "dynamic";


function checkLinkIsRelevant($link) {
  if ($link.data(DATA_ATTRIBUTE) === DATA_FLAG_DYNAMIC) {
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

    try {
      element = dominject({
        type: "style",
        url: url,
        attrs: {
          type: "text/css"
        }, // attributes to be added to the injected dom element
        timeout: 60 * 1000, // defaults to one minute that is allowed before the injection times out
        next: function(err, el) {
          if (err) {
            console.error("cssInjector dominject error " + err);
          }

          console.log("injected " + $(element).prop("id"));
        }
      });

      // set data attr
      $(element).data(DATA_ATTRIBUTE, DATA_FLAG_DYNAMIC);
    } catch (err) {
      console.error("cssInjector catched error " + err);
    }

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