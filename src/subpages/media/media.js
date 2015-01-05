var container = document.querySelector('#masonryContainer');
var msnry = new Masonry(container, {
  itemSelector: '.masonryItem'
});

var imgLoad = imagesLoaded(container);

imgLoad.on( 'progress', function( instance, image ) {
  msnry.layout();
});

imgLoad.on( 'done', function( instance ) {
  msnry.layout();
});

//console.log(msnry);