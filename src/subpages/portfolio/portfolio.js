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

var $paginatorLeft = $(".paginate-flex-button.left");
var $paginatorRight = $(".paginate-flex-button.right");
var $paginatorUp = $(".paginate-flex-button.up");
var $paginatorDown = $(".paginate-flex-button.down");

var toolTipOptions = {
  container: 'body',
  delay: {
    "show": 50,
    "hide": 150
  }
};

Reveal.addEventListener('ready', function(event) {

  $paginatorLeft.show();
  $paginatorRight.show();
  $paginatorUp.show();
  $paginatorDown.show();
  
  $paginatorLeft.on("click", function() {
    Reveal.navigateLeft();
    this.blur();
  });
  
  $paginatorRight.on("click", function() {
    Reveal.navigateRight();
    this.blur();
  });
  
  $paginatorUp.on("click", function() {
    Reveal.navigateUp();
    this.blur();
  });
  
  $paginatorDown.on("click", function() {
    Reveal.navigateDown();
    this.blur();
  });

  checkPaginatorVisibility();
});

function checkPaginatorVisibility() {

  var routes = Reveal.availableRoutes();

  if (routes.left) {
    $paginatorLeft.attr("data-state", "");
    $paginatorLeft.tooltip(toolTipOptions);
  } else {
    $paginatorLeft.attr("data-state", "disabled");
    $paginatorLeft.tooltip('destroy');
  }
  if (routes.right) {
    $paginatorRight.attr("data-state", "");
    $paginatorRight.tooltip(toolTipOptions);
  } else {
    $paginatorRight.attr("data-state", "disabled");
    $paginatorRight.tooltip('destroy');
  }
  if (routes.up) {
    $paginatorUp.attr("data-state", "");
    $paginatorUp.tooltip(toolTipOptions);
  } else {
    $paginatorUp.attr("data-state", "disabled");
    $paginatorUp.tooltip('destroy');
  }
  if (routes.down) {
    $paginatorDown.attr("data-state", "");
    $paginatorDown.tooltip(toolTipOptions);
  } else {
    $paginatorDown.attr("data-state", "disabled");
    $paginatorDown.tooltip('destroy');
  }
}

Reveal.addEventListener('slidechanged', function(event) {
  checkPaginatorVisibility();
});

window.dealloc = function() {

  $paginatorLeft.tooltip('destroy');
  $paginatorRight.tooltip('destroy');
  $paginatorUp.tooltip('destroy');
  $paginatorDown.tooltip('destroy');

  $paginatorLeft.off();
  $paginatorRight.off();
  $paginatorUp.off();
  $paginatorDown.off();

  Reveal.removeEventListeners();
  Reveal = null;
};