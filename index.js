/*! majodev.github.io - v1.0.0 - build 2015-01-17 18:09:49 */
!function(){var a=$("html, body");$(".smoothScroll").click(function(){var b=$.attr(this,"href");return"undefined"!=typeof b?(a.animate({scrollTop:$(b).offset().top},500,function(){window.location.hash=b}),!1):void 0})}();