jQuery(function($) {

  // adapted from https://github.com/roryg/ghostwriter/blob/master/assets/js/scripts.js

  var FADE_TIME_MS = 250;

  var History = window.History;
  var targetContainer = $("#main-content");
  var loading = false;

  // Check if history is enabled for the browser
  if (!History.enabled) {
    return false;
  }

  History.Adapter.bind(window, "statechange", function() {
    var State = History.getState();

    // Get the requested url and replace the current content
    // with the loaded content
    $.get(State.url, function(result) {
      var html = $(result);
      var newContent = $("#main-content", html).contents();

      

      // Set the title to the requested urls document title
      document.title = html.filter("title").text();

      $("html, body").animate({
        "scrollTop": 0
      });

      targetContainer.fadeOut(FADE_TIME_MS, function() {

        //console.log(html.filter("#main-content").text());

        targetContainer.html(html.filter("#main-content"));
        targetContainer.fadeIn(FADE_TIME_MS);

        loading = false;
      });
    });
  });

  $("body").on("click", "a", function(e) {
    e.preventDefault();

    if (loading === false) {
      var currentState = History.getState();
      var url = $(this).attr("href");
      var title = $(this).attr("title") || null;

      // If the requested url is not the current states url push
      // the new state and make the ajax call.
      if (url !== currentState.url.replace(/\/$/, "")) {
        loading = true;
        History.pushState({}, title, url);
      } else {
        // Swap in the latest post or post index as needed
        $("html, body").animate({
          "scrollTop": 0
        });
      }
    }

  });

});