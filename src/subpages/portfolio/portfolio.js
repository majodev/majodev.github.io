// Full list of configuration options available here:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
  // Display controls in the bottom right corner
  controls: false,
  // Display a presentation progress bar
  progress: true,
  // Display the page number of the current slide
  slideNumber: false,
  // Push each slide change to the browser history
  history: true,
  // Enable keyboard shortcuts for navigation
  keyboard: true,
  // Enable the slide overview mode
  overview: false,
  // Vertical centering of slides
  center: true,
  // Enables touch navigation on devices with touch input
  touch: true,
  // Loop the presentation
  loop: false,
  // Change the presentation direction to be RTL
  rtl: false,
  // Turns fragments on and off globally
  fragments: true,
  // Flags if the presentation is running in an embedded mode,
  // i.e. contained within a limited portion of the screen
  embedded: true,
  // Number of milliseconds between automatically proceeding to the
  // next slide, disabled when set to 0, this value can be overwritten
  // by using a data-autoslide attribute on your slides
  autoSlide: 0,
  // Stop auto-sliding after user input
  autoSlideStoppable: true,
  // Enable slide navigation via mouse wheel
  mouseWheel: false,
  // Hides the address bar on mobile devices
  hideAddressBar: true,
  // Opens links in an iframe preview overlay
  previewLinks: false,
  // Transition style
  transition: 'default', // default/cube/page/concave/zoom/linear/fade/none
  // Transition speed
  transitionSpeed: 'default', // default/fast/slow
  // Transition style for full page slide backgrounds
  backgroundTransition: 'default', // default/none/slide/concave/convex/zoom
  // Number of slides away from the current that are visible
  viewDistance: 3,
  // Parallax background image
  parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"
  // Parallax background size
  parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px"
  // Optional libraries used to extend on reveal.js
  // dependencies: [{
  //   src: 'lib/js/classList.js',
  //   condition: function() {
  //     return !document.body.classList;
  //   }
  // }]
});


Reveal.configure({
  keyboard: {
    66: null, // no black screen
    190: null,
    191: null,
    70: null // no fullscreen
  }
});

// $(".navigate-left").addClass("needsclick");
// $(".navigate-right").addClass("needsclick");
// $(".navigate-up").addClass("needsclick");
// $(".navigate-down").addClass("needsclick");

var $paginatorLeft = $(".paginate-flex-button.left");
var $paginatorRight = $(".paginate-flex-button.right");


Reveal.addEventListener('ready', function(event) {
  $paginatorLeft.on("click", function() {
    Reveal.navigateLeft();
  });

  $paginatorRight.on("click", function() {
    Reveal.navigateRight();
  });

  checkPaginatorVisibility();
});

function checkPaginatorVisibility() {
  // console.log("checkPaginatorVisibility");
  if (Reveal.isFirstSlide() === true) {
    $paginatorLeft.attr("data-state", "disabled");
  } else {
    $paginatorLeft.attr("data-state", "");
  }
  if (Reveal.isLastSlide() === true) {
    $paginatorRight.attr("data-state", "disabled");
  } else {
    $paginatorRight.attr("data-state", "");
  }
}

Reveal.addEventListener('slidechanged', function(event) {
  checkPaginatorVisibility();
});

window.dealloc = function() {

  $paginatorLeft.off();
  $paginatorRight.off();

  Reveal.removeEventListeners();
  Reveal = null;

  $(".block-header").css("background-color", "#fefefe");
};