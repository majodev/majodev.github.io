
// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  controls: true,
  progress: true,
  history: false,
  center: true,

  theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
  transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none

  // Parallax scrolling
  // parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
  // parallaxBackgroundSize: '2100px 900px',

  // Optional libraries used to extend on reveal.js
  dependencies: [{
    src: 'lib/js/classList.js',
    condition: function() {
      return !document.body.classList;
    }
  }]
});

$(".block-header").velocity({
  backgroundColor: "#000000",
  backgroundColorAlpha: 0.1
});


window.dealloc = function() {

  $(".block-header").css("background-color", "#FFF");

  // console.log("dealloc");
  // $(".block-header").velocity({
  //   backgroundColor: "#FFFFFF",
  //   backgroundColorAlpha: 1
  // });
}