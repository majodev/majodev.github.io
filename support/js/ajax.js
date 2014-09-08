var uiHelper = require("./uiHelper");
var urlHelper = require("./urlHelper");

$(function($) {

  // base from https://github.com/roryg/ghostwriter/blob/master/assets/js/scripts.js

  var AJAX_SELECTOR = "#ajax-container";
  var SCRIPTS_SELECTOR = "#scripts_src";
  // var FOOTER_CLASS = ".block-footer"; // no longer needed!
  var FADE_TIME_AJAX_MS = 100;
  //var FADE_TIME_CHILDS_MS = 250;
  //var ANCHOR_SCROLL_OFFSET_TOP = 0;

  var History = window.History;
  var $targetContainer = $(AJAX_SELECTOR);
  var $scriptsContainer = $(SCRIPTS_SELECTOR);
  var loading = false;
  var loadAnchor = "";

  // Check if history is enabled for the browser
  if (!History.enabled) {
    return false;
  }


  // https://gist.github.com/db/966388
  // $.ajax.progress.js
  // add XHR2 progress events to $.ajax
  (function addXhrProgressEvent($) {
    var originalXhr = $.ajaxSettings.xhr;
    $.ajaxSetup({
      progress: function() {
        console.log("standard progress callback");
      },
      xhr: function() {
        var req = originalXhr(),
          that = this;
        if (req) {
          if (typeof req.addEventListener == "function") {
            req.addEventListener("progress", function(evt) {
              that.progress(evt);
            }, false);
          }
        }
        return req;
      }
    });
  })($);

  History.Adapter.bind(window, "anchorchange", function() {
    var displayedPage = window.location.href;
    var statePage = History.getState().url;

    // console.log("anchorchange! url: " + window.location.href +
    //   " currentState: " + History.getState().url);

    if (urlHelper.removeAnchorFromUrl(displayedPage) !== urlHelper.removeAnchorFromUrl(statePage)) {
      if (urlHelper.testSameOrigin(displayedPage) === true) {
        // anchoring a wrong page - remember anchor and change state immediately
        setLoading(true);
        loadAnchor = urlHelper.getAnchor(displayedPage);
        History.replaceState({}, null, urlHelper.removeAnchorFromUrl(displayedPage));
      } else {
        // non ajaxable page + anchor!
        // console.warn("non ajaxable page with anchor enchountered!");
        document.location.href = displayedPage;
      }
    }
  });

  History.Adapter.bind(window, "statechange", function() {
    var State = History.getState();
    var url = urlHelper.removeAnchorFromUrl(State.url);
    //console.log("statechange - url: " + url);

    $.ajax({
      url: url,
      type: "GET",
      success: function(result) {
        var $html = $(result);
        var newContent = $($html.filter(AJAX_SELECTOR)[0]).children();
        var newScripts = $($html.filter(SCRIPTS_SELECTOR)[0]).children();

        uiHelper.incPageLoadingProgress();
        //NProgress.inc();

        // Set the title to the requested urls document title
        document.title = $html.filter("title").text();

        exchangeMetaData($html);

        $("html").velocity("scroll", {
          offset: "0px",
          complete: function(elements) {
            attachAnchor(url, null);
          }
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

        // direct
        if (typeof window.ontouchstart !== 'undefined') { // handle touch device issue
          $targetContainer.html("");
          setTimeout(function() {
            // http://stackoverflow.com/questions/3120497/safari-iphone-ipad-mouse-hover-on-new-link-after-prior-one-is-replaced-with-ja
            // fix ios hover issue by re-adding everything asynchronous
            exchangeContent();
          }, 0);
        } else {
          exchangeContent();
        }

        function exchangeContent() {
          $targetContainer.html(newContent);
          $scriptsContainer.html(newScripts);
          setLoading(false);
          uiHelper.init();
        }

      },
      error: function(error) {
        console.error("AJAX error" + error);
        setLoading(false);

        document.location.href = "/404.html";
      },
      progress: function(evt) {
        var currentProgress = 0;
        if (evt.lengthComputable) {
          currentProgress = (evt.loaded / evt.total);
          uiHelper.incPageLoadingProgress(currentProgress);
          // if (NProgress.status > currentProgress) { // dont progress back!
          //   NProgress.inc();
          // } else {
          //   NProgress.set(currentProgress);
          // }
          //NProgress.set(NProgress.status + ((evt.loaded / evt.total) / 2));
          //console.log("Loaded " + parseInt((evt.loaded / evt.total * 100), 10) + "%");
        } else {
          uiHelper.incPageLoadingProgress();
          //NProgress.inc();
          //console.log("Length not computable.");
        }
      }
    });
  });

  $("body").on("click", "a", function(e) {
    if (checkEventShouldBeCaptured(e) === true &&
      urlHelper.testSameOrigin(e.target.href) === true) {

      e.preventDefault();

      if (loading === false) {
        var currentState = History.getState();
        var url = $(this).attr("href");
        var title = $(this).attr("title") || null;

        // If it's a url with anchor, clear it immediately!
        if (urlHelper.hasAnchor(url)) {
          loadAnchor = urlHelper.getAnchor(url);
          url = urlHelper.removeAnchorFromUrl(url);
        }

        // If the requested url is not the current states url push
        // the new state and make the ajax call.
        if (url !== currentState.hash && url.length !== 0) {
          setLoading(true);
          History.pushState({}, title, url);
        } else {
          if (loadAnchor.length > 0) {
            attachAnchor(url, title);
          } else {
            // same url just scroll to top!
            $("html").velocity("scroll", {
              offset: "0px"
            });
          }
        }
      }
    }
  });

  function setLoading(value) {
    uiHelper.setPageLoading(value);
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

  function checkEventShouldBeCaptured(event) {
    if (event.which == 2 || event.metaKey) {
      return false;
    }
    return true;
  }

  function exchangeMetaData($newhtml) {
    // exchange all metadata
    $("meta").each(function(child) {
      var $currentMeta = $($("meta")[child]);
      var newMetaContent = false;
      var attribute = $currentMeta.attr("name");

      try {
        if (typeof attribute !== typeof undefined && attribute !== false) {
          //console.log("got meta name");
          newMetaContent = $newhtml.filter("meta[name=" + attribute + "]")[0].content;
        } else {
          attribute = $currentMeta.attr("http-equiv");
          if (typeof attribute !== typeof undefined && attribute !== false) {
            newMetaContent = $newhtml.filter("meta[http-equiv=" + attribute + "]")[0].content;
            //console.log("got meta http-equiv");
          } else {
            //console.log("failed meta parsing!"); // normal @charset!
          }
        }

        if (newMetaContent) { //exchange!
          //console.log(newMetaContent);
          $currentMeta.attr("content", newMetaContent);
        }
      } catch (e) {
        console.error("exchangeMetaData error: " + e);
      }

    });
  }

});