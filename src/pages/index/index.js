// main page index file
(function() {

  var WAIT_TIME_BEFORE_START_MS = 3000;
  setTimeout(function() {

    // consts
    var BG_IMG = {
      WIDTH: 3501,
      HEIGHT: 1904,
      WIDTH_MOD: 0.49,
      HEIGHT_MOD: 0.15
    };

    var BG_IMG_CLASS = ".index_bg_pusher";
    var OVERLAY_ITEM_CLASS = ".index_overlay_item";

    // runtime vars
    var $bg_img = $(BG_IMG_CLASS);
    var currentLoopItem = -1;
    var $currentLoopItem = null;
    var initialAnimationCompleteBool = false;

    // compute real absolute position, with values relative to original pos on img
    // adapted from http://www.growingwiththeweb.com/2013/04/aligning-and-element-with-background.html
    function normalizedPoint(point) {

      var wrapperWidth = $bg_img.width();
      var wrapperHeight = $bg_img.height();

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

    // listens to events to reorient dots
    $(window).on("resize", positionAllOverlayItems);
    $(window).on("orientationchange", positionAllOverlayItems);


    function positionAllOverlayItems() {
      if (initialAnimationCompleteBool === false) {
        $(OVERLAY_ITEM_CLASS).each(function() {
          positionOverlayItem($(this));
        });
      } else {
        positionOverlayItem($currentLoopItem);
      }
    }

    function positionOverlayItem($item) {
      var $overlay_item = $item;

      var newPoint = normalizedPoint({
        x: Number($overlay_item.attr("data-posX")),
        y: Number($overlay_item.attr("data-posY"))
      });

      if ($overlay_item.hasClass("index_overlay_item_right")) {
        $overlay_item.css("left", newPoint.x);
        $overlay_item.css("top", newPoint.y);
      }

      if ($overlay_item.hasClass("index_overlay_item_left")) {
        $overlay_item.css("right", $bg_img.width() - newPoint.x);
        $overlay_item.css("top", newPoint.y);
      }
    }

    // flash all items once
    function initialAnimation() {

      var standardDelay = 500;
      var delayIncrease = 250;

      $(OVERLAY_ITEM_CLASS).each(function() {
        var $overlay_item = $(this);

        $overlay_item.velocity("fadeIn", {
          duration: 500,
          delay: standardDelay,
          complete: function() {

            $(this).velocity("fadeOut", {
              delay: 250,
              duration: 500,
              complete: function() {
                initialAnimationComplete();
              }
            });

          }
        });

        standardDelay += delayIncrease;
      });

    }

    // function inner called when initial anim complete
    var initialAnimationComplete = _.after($(OVERLAY_ITEM_CLASS).length, function() {
      animationLoop();
      initialAnimationCompleteBool = true;
    });


    // animation loop all overlay items continuosly
    function animationLoop() {
      currentLoopItem += 1;
      if (currentLoopItem >= $(OVERLAY_ITEM_CLASS).length) {
        currentLoopItem = 0;
      }

      // remember this item (for responsive positioning.)
      $currentLoopItem = $($(OVERLAY_ITEM_CLASS).get(currentLoopItem));

      animateItem($currentLoopItem, animationLoop);
    }

    // animate one item
    function animateItem($item, callback) {

      positionOverlayItem($item);

      // console.log("animate!");
      $item.velocity("fadeIn", {
        duration: 500,
        delay: 500,
        complete: function() {
          $(this).velocity("fadeOut", {
            delay: 2500,
            duration: 500,
            complete: function() {
              callback();
            }
          });
        }
      });
    }

    // start up call these:
    positionAllOverlayItems();
    initialAnimation();

    // development only!!!
    // setInterval(function () {
    //   positionAllOverlayItems();
    // }, 200);

    window.dealloc = function() {
      $(window).off("resize", positionAllOverlayItems);
      $(window).off("orientationchange", positionAllOverlayItems);

      $bg_img = null;
      $currentLoopItem = null;
    };

  }, WAIT_TIME_BEFORE_START_MS); // wait ms for this all to happen!

}());