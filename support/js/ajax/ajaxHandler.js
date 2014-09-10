var EventEmitter = require('events').EventEmitter;
var util = require("util");

var urlHelper = require("./urlHelper");

// constants
var AJAX_SELECTOR = "#ajax-container";
var SCRIPTS_SELECTOR = "#scripts_src";
var FADE_TIME_AJAX_MS = 100;

// runtime vars
var History = null;
var $targetContainer = null;
var $scriptsContainer = null;
var loading = false;
var loadAnchor = "";

var AjaxHandler = function() {};
util.inherits(AjaxHandler, EventEmitter);
var ajaxHandler = new AjaxHandler();


AjaxHandler.prototype.init = function() {
  // Check if history is enabled for the browser
  if (!window.History.enabled) {
    console.error("AjaxHandler: History not enabled, aborting.");
    return false;
  }

  History = window.History;
  $targetContainer = $(AJAX_SELECTOR);
  $scriptsContainer = $(SCRIPTS_SELECTOR);


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

  History.Adapter.bind(window, "anchorchange", historyAnchorChange);
  History.Adapter.bind(window, "statechange", historyStateChange);
  $("body").on("click", "a", jqueryLinkEvent);

};

function jqueryLinkEvent(e) {
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
          ajaxHandler.emit("triedSameUrlLoading");
        }
      }
    }
  }
}

function historyAnchorChange() {
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
}

function historyStateChange() {
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

      ajaxHandler.emit("beforePageExchange", {
        callback: function() {
          attachAnchor(url, null);
        }
      });

      // Set the title to the requested urls document title
      document.title = $html.filter("title").text();
      // exchange the meta
      exchangeMetaData($html);

      // direct
      if (_.isUndefined(window.ontouchstart) === false) { // handle touch device issue
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
        ajaxHandler.emit("pageExchanged");
      }

    },
    error: function(error) {
      console.error("AJAX error" + error);
      setLoading(false);
      ajaxHandler.emit("loadingError");
    },
    progress: function(evt) {
      var currentProgress = 0;
      if (evt.lengthComputable) {
        currentProgress = (evt.loaded / evt.total);
      }
      ajaxHandler.emit("loadingProgress", currentProgress);
    }
  });
}

function setLoading(value) {

  if (value === true) {
    ajaxHandler.emit("loadingStart");
  } else {
    ajaxHandler.emit("loadingEnd");
  }

  loading = value;
}

function attachAnchor(url, title) {
  if (loadAnchor.length > 0) {
    History.replaceState({}, title, url + "#" + loadAnchor);

    ajaxHandler.emit("attachedAnchor", {
      anchorname: loadAnchor
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
      if (_.isUndefined(attribute) === false && attribute !== false) {
        //console.log("got meta name");
        newMetaContent = $newhtml.filter("meta[name=" + attribute + "]")[0].content;
      } else {
        attribute = $currentMeta.attr("http-equiv");
        if (_.isUndefined(attribute) === false && attribute !== false) {
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


module.exports = ajaxHandler;