var EventEmitter = require('events').EventEmitter;
var util = require("util");

var urlHelper = require("./urlHelper");

// constants
var AJAX_SELECTOR = "#ajax-container";
var SCRIPTS_SELECTOR = "#scripts_src";
var FADE_TIME_AJAX_MS = 100;

// runtime vars
// https://github.com/devote/HTML5-History-API
var location = window.history.location || window.location; // 
// using history instead of History!

// own
var $targetContainer = null;
var $scriptsContainer = null;
var loading = false;
var loadAnchor = "";
var ajaxpreventUrl = "";

var AjaxHandler = function() {};
util.inherits(AjaxHandler, EventEmitter);
var ajaxHandler = new AjaxHandler();


AjaxHandler.prototype.init = function() {
  // Check if history is enabled for the browser
  if (history.emulated === true) {
    console.warn("AjaxHandler: History is emulated, polyfilled!");
    //return false;
  }

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

  // check startup occured at ajaxPrevented page
  setPreventAjax($targetContainer);

  // hang on popstate event triggered by pressing back/forward in browser
  $(window).on('popstate', function(e) {
    //console.log(e);
    if (checkPreventAjax(location.href) === false) {
      historyStateChange(location.href);
    }
  });

  $("body").on("click", "a", jqueryLinkEvent);

};

function jqueryLinkEvent(e) {
  var href = e.target.href;

  if (_.isUndefined(href) === true) {
    href = e.currentTarget.href;
  }

  if (_.isUndefined(href) === false &&
    checkPreventAjax(href) === false &&
    checkEventShouldBeCaptured(e) === true &&
    urlHelper.testSameOrigin(href) === true &&
    urlHelper.isProhibitedExtension(href) === false) {

    e.preventDefault();

    if (loading === false) {
      var currentState = location;
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
        history.pushState({}, title, url);
        historyStateChange(url);
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

function checkPreventAjax(url) {
  if (ajaxpreventUrl !== "") {
    if (ajaxpreventUrl === urlHelper.removeAnchorFromUrl(url)) {
      //console.log("url ajax prevented!");
      return true;
    }
  }
  return false;
}

function setPreventAjax($container) {
  if (_.isUndefined($container.data("preventpopstate")) === false) {
    //console.log("ajaxprevent on url " + location.href + " active");
    ajaxpreventUrl = urlHelper.removeAnchorFromUrl(location.href);
    return true;
  }

  //console.log("ajaxprevent inactive");
  ajaxpreventUrl = "";
  return false;
}

function historyStateChange(urlToLoad) {
  var State = history.state;
  var url = urlHelper.removeAnchorFromUrl(urlToLoad);
  //console.log("statechange - url: " + url);

  $.ajax({
    url: url,
    type: "GET",
    success: function(result) {
      var $html = $(result);
      var ajaxNode = $html.filter(AJAX_SELECTOR);
      var newContent = $(ajaxNode[0]).children();
      var newScripts = $($html.filter(SCRIPTS_SELECTOR)[0]).children();

      // whuups this page is not ajaxable, instantly load it normally!
      if (ajaxNode.length < 1) {
        window.location.href = urlToLoad;
        return;
      }

      setPreventAjax($($html.filter(AJAX_SELECTOR)[0]));

      ajaxHandler.emit("beforePageExchange", {
        callback: function() {
          beforePageExchangeComplete();
        },
        $newHTML: $html
      });


      function beforePageExchangeComplete() {
        var htmlTitle = $html.filter("title").text();
        // Set the title to the requested urls document title
        document.title = htmlTitle;
        // exchange the meta
        exchangeMetaData($html);
        exchangeContent();
        attachAnchor(url, null);

        function exchangeContent() {
          $targetContainer.html(newContent);
          $scriptsContainer.html(newScripts);
          setLoading(false);
          ajaxHandler.emit("pageExchanged", {
            title: htmlTitle,
            path: url
          });
        }
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
    history.replaceState({}, title, url + "#" + loadAnchor);

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
      // console.error("exchangeMetaData error: " + e);
      // fail silently on unrecognized expression errors.
    }

  });
}


module.exports = ajaxHandler;