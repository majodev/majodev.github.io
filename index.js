/*! majodev.github.io - v0.9.0 - build 2014-10-01 20:05:21 */
!function(){var a=1500;setTimeout(function(){function a(a){var b,c=l.width(),d=l.height(),e=c/g.WIDTH,f=d/g.HEIGHT,h=0,i=0;return e>f?(b=e,h=(d-g.HEIGHT*b)*g.HEIGHT_MOD):(b=f,i=(c-g.WIDTH*b)*g.WIDTH_MOD),{x:a.x*b+i,y:a.y*b+h}}function b(){setTimeout(function(){c()},500)}function c(){d(n)}function d(b){var c=b,d=a({x:Number(c.attr("data-posX")),y:Number(c.attr("data-posY"))});c.hasClass("index_overlay_item_right")&&(c.css("left",d.x),c.css("top",d.y),l.width()>h?c.css("right",i+(l.width()-h)/2):c.css("right",i)),c.hasClass("index_overlay_item_left")&&(c.css("right",l.width()-d.x),c.css("top",d.y),l.width()>h?c.css("left",i+(l.width()-h)/2):c.css("left",i))}function e(){m+=1,m>=$(k).length&&(m=0),n=$($(k).get(m)),f(n,e)}function f(a,b){o!==!1&&(d(a),a.velocity("fadeIn",{duration:500,complete:function(){var a=$(this);setTimeout(function(){b(),a.velocity("fadeOut",{duration:500})},5e3)}}))}var g={WIDTH:3501,HEIGHT:1904,WIDTH_MOD:.49,HEIGHT_MOD:.15},h=850,i=10,j=".index_bg_pusher",k=".index_overlay_item",l=$(j),m=-1,n=null,o=!0;$(window).on("resize",c),$(window).on("orientationchange",b),e(),window.dealloc=function(){o=!1,$(window).off("resize",c),$(window).off("orientationchange",b),l=null,n=null}},a)}();