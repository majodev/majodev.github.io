/*! majodev.github.io - v0.9.0 - build 2014-10-20 14:59:54 */
!function(){var a=1500;setTimeout(function(){function a(a){var b,c=n.width(),d=n.height(),e=c/i.WIDTH,f=d/i.HEIGHT,g=0,h=0;return e>f?(b=e,g=(d-i.HEIGHT*b)*i.HEIGHT_MOD):(b=f,h=(c-i.WIDTH*b)*i.WIDTH_MOD),{x:a.x*b+h,y:a.y*b+g}}function b(){setTimeout(function(){c()},500)}function c(){d(p)}function d(b){var c=b,d=a({x:Number(c.attr("data-posX")),y:Number(c.attr("data-posY"))});c.hasClass("index_overlay_item_right")&&(c.css("left",d.x),c.css("top",d.y),n.width()>j?c.css("right",k+(n.width()-j)/2):c.css("right",k)),c.hasClass("index_overlay_item_left")&&(c.css("right",n.width()-d.x),c.css("top",d.y),n.width()>j?c.css("left",k+(n.width()-j)/2):c.css("left",k))}function e(){o+=1,o>=$(m).length&&(o=0),p=$($(m).get(o)),f(p)}function f(a){q!==!1&&(d(a),a.velocity("fadeIn",{duration:500,complete:function(){s=!0,r=setTimeout(g,5e3)}}))}function g(){s=!1,p.velocity("fadeOut",{duration:500,complete:function(){e()}})}function h(){s===!0&&(clearTimeout(r),g())}var i={WIDTH:3501,HEIGHT:1904,WIDTH_MOD:.49,HEIGHT_MOD:.15},j=850,k=10,l=".index_bg_pusher",m=".index_overlay_item",n=$(l),o=-1,p=null,q=!0;$(window).on("resize",c),$(window).on("orientationchange",b);var r,s=!1;e(),$(l).on("click",function(){h()}),window.dealloc=function(){q=!1,clearTimeout(r),$(window).off("resize",c),$(window).off("orientationchange",b),$(l).off(),n=null,p=null}},a)}();