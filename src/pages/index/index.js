// main page index file
(function() {

  // consts
  var BG_IMG = {
    WIDTH: 3501,
    HEIGHT: 1904,
    WIDTH_MOD: 0.49,
    HEIGHT_MOD: 0.15
  };

  var OVERLAY_WRAPPER_ID = "#index_overlay_wrapper";
  var OVERLAY_ITEM_CLASS = ".index_overlay_item";

  // runtime vars
  var $overlay_wrapper = $(OVERLAY_WRAPPER_ID);

  // adapted from http://www.growingwiththeweb.com/2013/04/aligning-and-element-with-background.html
  function normalizedPoint(point) {

    var wrapperWidth = $overlay_wrapper.width();
    var wrapperHeight = $overlay_wrapper.height();

    var xScale = wrapperWidth / BG_IMG.WIDTH;
    var yScale = wrapperHeight / BG_IMG.HEIGHT;

    var scale;
    var yOffset = 0;
    var xOffset = 0;

    if (xScale > yScale) {
      // The image fits perfectly in x axis, stretched in y
      scale = xScale;
      yOffset = (wrapperHeight - (BG_IMG.HEIGHT * scale)) * BG_IMG.HEIGHT_MOD;
    } else {
      // The image fits perfectly in y axis, stretched in x
      scale = yScale;
      xOffset = (wrapperWidth - (BG_IMG.WIDTH * scale)) * BG_IMG.WIDTH_MOD;
    }

    return {
      x: (point.x) * scale + xOffset,
      y: (point.y) * scale + yOffset
    };
  }

  $(window).on("resize", positionOverlays);

  // development only!!!
  // setInterval(function () {
  //   positionOverlays();
  // }, 200);


  function positionOverlays() {
    $(OVERLAY_ITEM_CLASS).each(function() {
      var $overlay_item = $(this);

      var newPoint = normalizedPoint({
        x: Number($overlay_item.attr("data-posX")),
        y: Number($overlay_item.attr("data-posY"))
      });

      if ($overlay_item.hasClass("index_overlay_item_right")) {
        $overlay_item.css("left", newPoint.x);
        $overlay_item.css("top", newPoint.y);
      } 

      if ($overlay_item.hasClass("index_overlay_item_left")) {
        $overlay_item.css("right", $overlay_wrapper.width()-newPoint.x);
        $overlay_item.css("top", newPoint.y);
      }

    });
  }

  function animateOverlays() {

    var standardDelay = 500;
    var delayIncrease = 250;

    $(OVERLAY_ITEM_CLASS).each(function() {
      var $overlay_item = $(this);

      $overlay_item.velocity("fadeIn", {
        duration: 500,
        delay: standardDelay
      });

      standardDelay += delayIncrease;
    });
  }

  positionOverlays();
  animateOverlays();


  window.dealloc = function() {
    $(window).off("resize", positionOverlays);

    $overlay_wrapper = null;
  };

}());