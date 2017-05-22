var DISQUS_DIV_ID = "#disqus_thread";
var DISQUS_FORUM_ID = "ranftl";
var DISQUS_API_KEY = "fC8zZ6ljDpOKnQqJvR43bZowF68FawopkflG2skcnXJM8n5aLjXW6UzwYtWvYFuA";


var disqus_shortname = DISQUS_FORUM_ID;
var data = {};
var initialized = false;
var disqus_identifier, disqus_title, disqus_url, disqus_config;

function checkIsLive() { // dont load disqus in dev environment
  var host = window.location.hostname;
  if (host.indexOf("localhost") !== 0 && host.indexOf("127.0.0.1") !== 0) {
    return true;
  } else {
    return false;
  }
}

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
    lang: $(DISQUS_DIV_ID).data('lang')
  };
}

function init() {
  // getCommentCount();
  if (checkIsLive() === false) {
    return;
  }
  if (checkPageIsDisqusEnabled() === true) {
    if (initialized === false) {
      readDisqusData();
      disqus_identifier = data.id;
      disqus_title = data.title;
      disqus_url = data.url;
      disqus_config = function () {
        this.language = data.lang;
      };

      // embed disqus
      var dsq = document.createElement('script');
      dsq.type = 'text/javascript';
      dsq.async = true;
      dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';

      // disable cloudflare rocket-loader for disqus
      // see http://www.howson.pro/fixing-disqus-comments-when-using-cloudflare/
      try {
        dsq.dataset.cfasync = "false";
      } catch (e) {
        console.error("unable to set cfasync attribute for disqus.", e);
      }


      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

      initialized = true;
    } else {
      console.warn("disqus is already initialized!");
    }
  }
}

function reset() {
  // getCommentCount();
  if (checkIsLive() === false) {
    return;
  }
  if (checkPageIsDisqusEnabled() === true) {
    if (initialized === true && typeof DISQUS !== "undefined") {
      readDisqusData();
      DISQUS.reset({
        reload: true,
        config: function () {
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

// function getCommentCount() {
//   var linkList = [];

//   $('.block-noteCommentCount').each(function() {
//     var url = $(this).attr('data-disqus-url');
//     if (_.isUndefined(url) === false) {
//       linkList.push('link:' + url);
//     }
//   });

//   if (linkList.length > 0) {
//     $.ajax({
//       type: 'GET',
//       url: "https://disqus.com/api/3.0/threads/set.jsonp",
//       data: {
//         api_key: DISQUS_API_KEY,
//         forum: disqus_shortname,
//         thread: linkList
//       },
//       cache: false,
//       dataType: 'jsonp',
//       success: function(result) {

//         for (var i in result.response) {

//           var countText = " comments";
//           var count = result.response[i].posts;

//           if (count == 1)
//             countText = " comment";

//           //<a href="{{pathuri}}#disqus_thread">comments</a>
//           $('span[data-disqus-url="' + result.response[i].link + '"]').html('<a href="' + result.response[i].link + '#disqus_thread">' + count + countText + '</a>');
//           //$('span[data-disqus-url="' + result.response[i].link + '"]').html('<h4>' + count + countText + '</h4>');

//         }
//       }
//     });
//   }

// }

module.exports = {
  init: init,
  reset: reset
};