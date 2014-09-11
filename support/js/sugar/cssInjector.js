var dominject = require("dominject");
var async = require("async");

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

function injectUrl(url, callback) {
  var element = _.isUndefined(document.getElementById(url)) ? null : document.getElementById(url);

  if (element !== null) {
    $(element).prop('disabled', false);
    console.log("enabled " + $(element).prop("id"));
    callback(null);
  } else {

    try {
      element = dominject({
        type: "style",
        url: url,
        attrs: {
          type: "text/css"
        }, // attributes to be added to the injected dom element
        timeout: 15 * 1000, // 15 seconds
        next: function(err, el) {
          if (err) {
            console.error("cssInjector dominject error " + err);
          }

          callback(null);

          console.log("injected " + $(element).prop("id"));
        }
      });

      // set data attr
      $(element).data(DATA_ATTRIBUTE, DATA_FLAG_DYNAMIC);
    } catch (err) {
      console.error("cssInjector catched error " + err);
      callback(err);
    }

  }
}


module.exports = {
  injectCSSIntoMeta: function($newHTML, completeCallback) {

    var cssLinks = $($newHTML).filter("link");

    async.each(cssLinks, function(link, callback) {
      var $link = $(link);

      if (checkLinkIsRelevant($link) === true) {
        injectUrl($link.prop("id"), callback);
      } else {
        callback(null);
      }

    }, function(err) {
      if (err) {
        console.log('A link failed to process');
      } else {
        // console.log('All links have been processed successfully');
      }

      completeCallback(null);

    });

    // _.each(cssLinks, function(link) {
    //   var $link = $(link);
    //   if (checkLinkIsRelevant($link) === true) {
    //     injectUrl($link.prop("id"));
    //   }
    // });
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