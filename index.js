/*! majodev.github.io - v1.0.0 - build 2014-12-11 20:10:01 */
!function(){var a=$("html, body");$(".smoothScroll").click(function(){var b=$.attr(this,"href");return"undefined"!=typeof b?(a.animate({scrollTop:$(b).offset().top},500,function(){window.location.hash=b}),!1):void 0})}();