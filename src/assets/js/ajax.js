jQuery(function($) {

  // adapted from https://github.com/roryg/ghostwriter/blob/master/assets/js/scripts.js

  var FADE_TIME_MS = 180;

  var History = window.History;
  var targetContainer = $("#main-content");
  var loading = false;

  // Check if history is enabled for the browser
  if (!History.enabled) {
    return false;
  }

  History.Adapter.bind(window, "statechange", function() {
    var State = History.getState();

    $.ajax({
      url: State.url,
      type: "GET",
      success: function(result) {
        var html = $(result);
        var newContent = $("#main-content", html).contents();

        // Set the title to the requested urls document title
        document.title = html.filter("title").text();

        $("html, body").animate({
          "scrollTop": 0
        });

        // stop old running javascript...
        if (typeof window.dealloc !== "undefined") {
          try {
            window.dealloc();
            window.dealloc = undefined;
          } catch (e) {
            console.error("ajax: could not dealloc previous running script! error:" + e);
          }
        }

        targetContainer.fadeOut(FADE_TIME_MS, function() {
          //console.log(html.filter("#main-content")[0]);
          targetContainer.html($(html.filter("#main-content")[0]).children());
          targetContainer.fadeIn(FADE_TIME_MS);
          loading = false;
        });
      },
      error: function(error) {
        console.error("AJAX error" + error);
        loading = false;

        document.location.href = "/404.html";
      }
    });
  });

  $("body").on("click", "a", function(e) {
    if (testSameOrigin(e.target.href) === true) { // only ajax on same origin
      e.preventDefault();

      if (loading === false) {
        var currentState = History.getState();
        var url = $(this).attr("href");
        var title = $(this).attr("title") || null;

        // If it's a url with anchor, don't let ajax handle it!
        if (hasAnchor(url)) {
          if (removeAnchorFromUrl(url).length === 0) {
            // same page anchor
            document.location.href = removeAnchorFromUrl(currentState.hash) + "#" + getAnchor(url);
            return; // finish handling here!
          } else {
            // other page anchor (might be ajaxed in the future!)
            document.location.href = url;
          }
          return;
        }

        // If the requested url is not the current states url push
        // the new state and make the ajax call.
        if (url !== currentState.hash) {
          loading = true;
          History.pushState({}, title, url);
        }
      }
    }
  });

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

});