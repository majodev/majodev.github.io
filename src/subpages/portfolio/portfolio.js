
// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
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


$(".navigate-left").addClass("needsclick");
$(".navigate-right").addClass("needsclick");
$(".navigate-up").addClass("needsclick");
$(".navigate-down").addClass("needsclick");

window.dealloc = function() {

  Reveal.removeEventListeners();
  Reveal = null;

  $(".block-header").css("background-color", "#fefefe");
};