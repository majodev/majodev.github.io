// main page index file
(function() {

  // var WAIT_TIME_BEFORE_START_MS = 1500;
  // setTimeout(function() {

  //   // consts
  //   var BG_IMG = {
  //     WIDTH: 3501,
  //     HEIGHT: 1904,
  //     WIDTH_MOD: 0.49,
  //     HEIGHT_MOD: 0.15
  //   };

  //   var OVERLAY_MAX_DIMENSION_PX = 850;
  //   var OVERLAY_MIN_OFFSET_PX = 10;

  //   var BG_IMG_CLASS = ".index_bg_pusher";
  //   var OVERLAY_ITEM_CLASS = ".index_overlay_item";

  //   // runtime vars
  //   var $bg_img = $(BG_IMG_CLASS);
  //   var currentLoopItem = -1;
  //   var $currentLoopItem = null;
  //   var loop_enabled = true;
  //   // var initialAnimationCompleteBool = false;

  //   // compute real absolute position, with values relative to original pos on img
  //   // adapted from http://www.growingwiththeweb.com/2013/04/aligning-and-element-with-background.html
  //   function normalizedPoint(point) {

  //     var wrapperWidth = $bg_img.width();
  //     var wrapperHeight = $bg_img.height();

  //     var xScale = wrapperWidth / BG_IMG.WIDTH;
  //     var yScale = wrapperHeight / BG_IMG.HEIGHT;

  //     var scale;
  //     var yOffset = 0;
  //     var xOffset = 0;

  //     if (xScale > yScale) {
  //       // The image fits perfectly in x axis, stretched in y
  //       scale = xScale;
  //       yOffset = (wrapperHeight - (BG_IMG.HEIGHT * scale)) * BG_IMG.HEIGHT_MOD;
  //     } else {
  //       // The image fits perfectly in y axis, stretched in x
  //       scale = yScale;
  //       xOffset = (wrapperWidth - (BG_IMG.WIDTH * scale)) * BG_IMG.WIDTH_MOD;
  //     }

  //     return {
  //       x: (point.x) * scale + xOffset,
  //       y: (point.y) * scale + yOffset
  //     };
  //   }

  //   // listens to events to reorient dots
  //   $(window).on("resize", positionAllOverlayItems);
  //   $(window).on("orientationchange", repositionWait);

  //   function repositionWait() { // ios hack (+ buggyfill vh wait)
  //     setTimeout(function() {
  //       positionAllOverlayItems();
  //     }, 500);
  //   }

  //   function positionAllOverlayItems() {
  //     positionOverlayItem($currentLoopItem);
  //   }

  //   function positionOverlayItem($item) {
  //     var $overlay_item = $item;

  //     var newPoint = normalizedPoint({
  //       x: Number($overlay_item.attr("data-posX")),
  //       y: Number($overlay_item.attr("data-posY"))
  //     });

  //     if ($overlay_item.hasClass("index_overlay_item_right")) {
  //       // dot position
  //       $overlay_item.css("left", newPoint.x);
  //       $overlay_item.css("top", newPoint.y);
  //       // screen align
  //       if ($bg_img.width() > OVERLAY_MAX_DIMENSION_PX) {
  //         $overlay_item.css("right", OVERLAY_MIN_OFFSET_PX + ($bg_img.width() - OVERLAY_MAX_DIMENSION_PX) / 2);
  //       } else {
  //         $overlay_item.css("right", OVERLAY_MIN_OFFSET_PX);
  //       }
  //     }

  //     if ($overlay_item.hasClass("index_overlay_item_left")) {
  //       // dot position
  //       $overlay_item.css("right", $bg_img.width() - newPoint.x);
  //       $overlay_item.css("top", newPoint.y);
  //       // screen align
  //       if ($bg_img.width() > OVERLAY_MAX_DIMENSION_PX) {
  //         $overlay_item.css("left", OVERLAY_MIN_OFFSET_PX + ($bg_img.width() - OVERLAY_MAX_DIMENSION_PX) / 2);
  //       } else {
  //         $overlay_item.css("left", OVERLAY_MIN_OFFSET_PX);
  //       }
  //     }
  //   }

  //   // animation loop all overlay items continuosly
  //   function animationLoop() {
  //     currentLoopItem += 1;
  //     if (currentLoopItem >= $(OVERLAY_ITEM_CLASS).length) {
  //       currentLoopItem = 0;
  //     }

  //     // remember this item (for responsive positioning.)
  //     $currentLoopItem = $($(OVERLAY_ITEM_CLASS).get(currentLoopItem));

  //     animateItem($currentLoopItem);
  //   }

  //   // animate one item
  //   var animateTimeout;
  //   var elementFadedIn = false;

  //   function animateItem($item) {

  //     if (loop_enabled === false) {
  //       return;
  //     }

  //     positionOverlayItem($item);

  //     // console.log("animate!");
  //     $item.velocity("fadeIn", {
  //       duration: 500,
  //       complete: function() {
  //         elementFadedIn = true;
  //         animateTimeout = setTimeout(animateNext, 5000);
  //       }
  //     });
  //   }

  //   function animateNext() {
  //     elementFadedIn = false;
  //     $currentLoopItem.velocity("fadeOut", {
  //       duration: 500,
  //       complete: function() {
  //         animationLoop();
  //       }
  //     });
  //   }

  //   function forceAnimateNext() {
  //     if (elementFadedIn === true) {
  //       clearTimeout(animateTimeout);
  //       animateNext();
  //     }
  //   }

  //   // start up call these:
  //   animationLoop();


  //   $(BG_IMG_CLASS).on("click", function()  {
  //     forceAnimateNext();
  //   });

  //   window.dealloc = function() {
  //     loop_enabled = false;
  //     clearTimeout(animateTimeout);
  //     $(window).off("resize", positionAllOverlayItems);
  //     $(window).off("orientationchange", repositionWait);

  //     $(BG_IMG_CLASS).off();

  //     $bg_img = null;
  //     $currentLoopItem = null;
  //   };

  // }, WAIT_TIME_BEFORE_START_MS); // wait ms for this all to happen!


  // Scroll to behaviour

  // $(".smoothScroll").on("click", function (e) {
  //   e.preventDefault();

  //   $("#hello").velocity("scroll", {
  //     complete: function(elements) {
  //       $("#hello").addClass("targetAnimation");
  //     }
  //   });
  // });

  // var $root = $('html, body');
  // $('.smoothScroll').click(function() {
  //   var href = $.attr(this, 'href');

  //   $root.velocity("scroll", {
  //     offset: $(href).offset().top,
  //     complete: function(elements) {
  //       window.location.hash = href;
  //     }

  //   });
  //   return false;
  // });

  var $root = $('html, body');
  $('.smoothScroll').click(function() {
    var href = $.attr(this, 'href');
    if (typeof href !== "undefined") {
      $root.animate({
        scrollTop: $(href).offset().top
      }, 500, function() {
        window.location.hash = href;
      });
      return false;
    }
  });


}());