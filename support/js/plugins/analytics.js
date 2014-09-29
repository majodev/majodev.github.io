var initialized = false;

function init() {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-42608142-5', 'auto');
  ga('send', 'pageview');
  initialized = true;
}

function pageview(path, title) {
  if (_.isUndefined(ga) === false && initialized === true) {
    ga('send', 'pageview', {
      'page': path,
      'title': title + " -- AJAX"
    });
  } else {
    console.warn("analytics: ga undefined or not initialized!");
  }
}

module.exports = {
  init: init,
  pageview: pageview
};