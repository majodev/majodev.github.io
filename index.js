/*! majodev.github.io - v1.0.0 - build 2017-05-15 22:20:15 */
!function(){var a=$("html, body");$(".smoothScroll").click(function(){var b=$.attr(this,"href");return"undefined"!=typeof b?(a.animate({scrollTop:$(b).offset().top},500,function(){window.location.hash=b}),!1):void 0})}();