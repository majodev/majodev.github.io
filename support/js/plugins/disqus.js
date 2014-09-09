var DISQUS_DIV_ID = "#disqus_thread";

var data = {};

var initialized = false;
var disqus_shortname = 'majodev'; // required: replace example with your forum shortname
var disqus_identifier, disqus_title, disqus_url, disqus_config;

function checkPageIsDisqusEnabled() {
  if ($(DISQUS_DIV_ID).length > 0) {
    return true;
  }
  return false;
}

function readDisqusData() {
  data = {
    id: $(DISQUS_DIV_ID).data('pageid'),
    title: $(DISQUS_DIV_ID).data('title'),
    url: $(DISQUS_DIV_ID).data('url'),
    lang: $(DISQUS_DIV_ID).data('url')
  };
}

function init() {
  if (checkPageIsDisqusEnabled() === true) {
    if (initialized === false) {
      readDisqusData();
      disqus_identifier = data.id;
      disqus_title = data.title;
      disqus_url = data.url;
      disqus_config = function() {
        this.language = data.lang;
      };

      // embed disqus
      var dsq = document.createElement('script');
      dsq.type = 'text/javascript';
      dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

      initialized = true;
    } else {
      console.warn("disqus is already initialized!");
    }
  }
}

function reset() {
  if (checkPageIsDisqusEnabled() === true) {
    if (initialized === true && typeof DISQUS !== "undefined") {
      readDisqusData();
      DISQUS.reset({
        reload: true,
        config: function() {
          this.page.identifier = data.id;
          this.page.url = data.url;
          this.page.title = data.title;
          this.language = data.lang;
        }
      });
    } else {
      init();
    }
  }
}

module.exports = {
  init: init,
  reset: reset
};