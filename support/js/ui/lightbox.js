function init() {
  $('.lightboximgwrap').magnificPopup({
    type: 'image',
    overflowY: "auto",
    callbacks: {
      open: function() {
        $("body").css("height", "initial");
      },
      afterClose: function() {
        $("body").css("height", "100%");
        $("body").css("overflow-y", "scroll");
      }
    },
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });
}

function unbind() {
  $('.lightboximgwrap').off();
}

module.exports = {
  init: init,
  unbind: unbind
};