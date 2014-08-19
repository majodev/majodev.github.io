jQuery(function($) {

  // base from https://github.com/roryg/ghostwriter/blob/master/assets/js/scripts.js

  var AJAX_SELECTOR = "#ajax-container";
  var FADE_TIME_MS = 180;
  //var ANCHOR_SCROLL_OFFSET_TOP = 0;

  var History = window.History;
  var $targetContainer = $(AJAX_SELECTOR);
  var loading = false;
  var loadAnchor = "";
  var $body = $(document.body);

  // Check if history is enabled for the browser
  if (!History.enabled) {
    return false;
  }

  History.Adapter.bind(window, "anchorchange", function() {
    var displayedPage = window.location.href;
    var statePage = History.getState().url;

    // console.log("anchorchange! url: " + window.location.href +
    //   " currentState: " + History.getState().url);

    if (removeAnchorFromUrl(displayedPage) !== removeAnchorFromUrl(statePage)) {
      if (testSameOrigin(displayedPage) === true) {
        // anchoring a wrong page - remember anchor and change state immediately
        setLoading(true);
        loadAnchor = getAnchor(displayedPage);
        History.replaceState({}, null, removeAnchorFromUrl(displayedPage));
      } else {
        // non ajaxable page + anchor!
        // console.warn("non ajaxable page with anchor enchountered!");
        document.location.href = displayedPage;
      }
    }
  });

  History.Adapter.bind(window, "statechange", function() {
    var State = History.getState();
    var url = removeAnchorFromUrl(State.url);
    //console.log("statechange - url: " + url);

    $.ajax({
      url: url,
      type: "GET",
      success: function(result) {
        var html = $(result);
        var newContent = $(html.filter(AJAX_SELECTOR)[0]).children();

        // Set the title to the requested urls document title
        document.title = html.filter("title").text();

        $("html").velocity("scroll", {
          offset: "0px"
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

        // via velocity
        $targetContainer.velocity("fadeOut", {
          duration: FADE_TIME_MS,
          complete: function(elements) {
            // console.log("complete 1!");
            $targetContainer.html(newContent);
            $targetContainer.velocity("fadeIn", {
              duration: FADE_TIME_MS,
              complete: function(elements) {
                // console.log("complete 2!");
                attachAnchor(url, null);
                setLoading(false);
              }
            });
          }
        });

      },
      error: function(error) {
        console.error("AJAX error" + error);
        setLoading(false);

        document.location.href = "/404.html";
      }
    });
  });

  $("body").on("click", "a", function(e) {
    if (checkEventShouldBeCaptured(e) === true &&
      testSameOrigin(e.target.href) === true) {

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
          setLoading(true);
          History.pushState({}, title, url);
        } else {
          attachAnchor(url, title);
        }
      }
    }
  });

  function setLoading(value) {
    if (value === true) {
      $body.addClass('loading');
    } else {
      $body.removeClass('loading');
    }
    loading = value;
  }

  function attachAnchor(url, title) {
    var $anchor = $("#" + loadAnchor);

    if (loadAnchor.length > 0) {
      History.replaceState({}, title, url + "#" + loadAnchor);

      $anchor.velocity("scroll", {
        complete: function(elements) {
          $anchor.addClass("targetAnimation");
          $anchor.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
            $anchor.removeClass("targetAnimation");
          });
        }
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

  function checkEventShouldBeCaptured(event) {
    if (event.which == 2 || event.metaKey) {
      return false;
    }
    return true;
  }

});