jQuery(function($) {

  // adapted from https://github.com/roryg/ghostwriter/blob/master/assets/js/scripts.js

  var FADE_TIME_MS = 200;

  var History = window.History;
  var targetContainer = $("#main-content");
  var loading = false;
  var loadAnchor = "";

  // Check if history is enabled for the browser
  if (!History.enabled) {
    return false;
  }

  History.Adapter.bind(window, "anchorchange", function() {
    var displayedPage = window.location.href;
    var statePage = History.getState().url;

    console.log("anchorchange! url: " + window.location.href +
      " currentState: " + History.getState().url);

    if (removeAnchorFromUrl(displayedPage) !== removeAnchorFromUrl(statePage)) {
      // anchoring a wrong page - remove anchor and change state immediately
      History.replaceState({}, null, removeAnchorFromUrl(window.location.href));
    }
  });

  History.Adapter.bind(window, "statechange", function() {
    var State = History.getState();
    var url = removeAnchorFromUrl(State.url);
    console.log("statechange - url: " + url);

    $.ajax({
      url: url,
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
          targetContainer.fadeIn(FADE_TIME_MS, function () {
            attachAnchor(url, null);
            loading = false;
          });
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

        // If it's a url with anchor, clear it immediately!
        if (hasAnchor(url)) {
          loadAnchor = getAnchor(url);
          url = removeAnchorFromUrl(url);
        }

        // If the requested url is not the current states url push
        // the new state and make the ajax call.
        if (url !== currentState.hash && url.length !== 0) {
          loading = true;
          History.pushState({}, title, url);
        } else {
          attachAnchor(url, title);
        }
      }
    }
  });

  function attachAnchor(url, title) {
    if (loadAnchor.length > 0) {
      History.replaceState({}, title, url + "#" + loadAnchor);
      $("html, body").animate({
        "scrollTop": ($("#" + loadAnchor).offset().top)
      });
      loadAnchor = "";
    }
  }

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