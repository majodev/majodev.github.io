/*! majodev.github.io - v0.9.0 - build 2014-11-22 15:16:35 */
var Reveal=function(){"use strict";function a(a){if(b(),!dc.transforms2d&&!dc.transforms3d)return void document.body.setAttribute("class","no-transforms");window.addEventListener("load",A,!1);var d=Reveal.getQueryHash();"undefined"!=typeof d.dependencies&&delete d.dependencies,k($b,a),k($b,d),r(),c()}function b(){dc.transforms3d="WebkitPerspective"in document.body.style||"MozPerspective"in document.body.style||"msPerspective"in document.body.style||"OPerspective"in document.body.style||"perspective"in document.body.style,dc.transforms2d="WebkitTransform"in document.body.style||"MozTransform"in document.body.style||"msTransform"in document.body.style||"OTransform"in document.body.style||"transform"in document.body.style,dc.requestAnimationFrameMethod=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,dc.requestAnimationFrame="function"==typeof dc.requestAnimationFrameMethod,dc.canvas=!!document.createElement("canvas").getContext,Ub=navigator.userAgent.match(/(iphone|ipod|android)/gi)}function c(){function a(){e.length&&head.js.apply(null,e),d()}function b(b){head.ready(b.src.match(/([\w\d_\-]*)\.?js$|[^\\\/]*$/i)[0],function(){"function"==typeof b.callback&&b.callback.apply(this),0===--f&&a()})}for(var c=[],e=[],f=0,g=0,h=$b.dependencies.length;h>g;g++){var i=$b.dependencies[g];(!i.condition||i.condition())&&(i.async?e.push(i.src):c.push(i.src),b(i))}c.length?(f=c.length,head.js.apply(null,c)):a()}function d(){e(),Q(),h(),cb(),X(!0),setTimeout(function(){cc.slides.classList.remove("no-transition"),_b=!0,t("ready",{indexh:Pb,indexv:Qb,currentSlide:Sb})},1)}function e(){cc.theme=document.querySelector("#theme"),cc.wrapper=document.querySelector(".reveal"),cc.slides=document.querySelector(".reveal .slides"),cc.slides.classList.add("no-transition"),cc.background=f(cc.wrapper,"div","backgrounds",null),cc.progress=f(cc.wrapper,"div","progress","<span></span>"),cc.progressbar=cc.progress.querySelector("span"),f(cc.wrapper,"aside","controls",'<div class="navigate-left"></div><div class="navigate-right"></div><div class="navigate-up"></div><div class="navigate-down"></div>'),cc.slideNumber=f(cc.wrapper,"div","slide-number",""),f(cc.wrapper,"div","state-background",null),f(cc.wrapper,"div","pause-overlay",null),cc.controls=document.querySelector(".reveal .controls"),cc.controlsLeft=l(document.querySelectorAll(".navigate-left")),cc.controlsRight=l(document.querySelectorAll(".navigate-right")),cc.controlsUp=l(document.querySelectorAll(".navigate-up")),cc.controlsDown=l(document.querySelectorAll(".navigate-down")),cc.controlsPrev=l(document.querySelectorAll(".navigate-prev")),cc.controlsNext=l(document.querySelectorAll(".navigate-next"))}function f(a,b,c,d){var e=a.querySelector("."+c);return e||(e=document.createElement(b),e.classList.add(c),null!==d&&(e.innerHTML=d),a.appendChild(e)),e}function g(){function a(a,b){var c={background:a.getAttribute("data-background"),backgroundSize:a.getAttribute("data-background-size"),backgroundImage:a.getAttribute("data-background-image"),backgroundColor:a.getAttribute("data-background-color"),backgroundRepeat:a.getAttribute("data-background-repeat"),backgroundPosition:a.getAttribute("data-background-position"),backgroundTransition:a.getAttribute("data-background-transition")},d=document.createElement("div");return d.className="slide-background",c.background&&(/^(http|file|\/\/)/gi.test(c.background)||/\.(svg|png|jpg|jpeg|gif|bmp)$/gi.test(c.background)?d.style.backgroundImage="url("+c.background+")":d.style.background=c.background),(c.background||c.backgroundColor||c.backgroundImage)&&d.setAttribute("data-background-hash",c.background+c.backgroundSize+c.backgroundImage+c.backgroundColor+c.backgroundRepeat+c.backgroundPosition+c.backgroundTransition),c.backgroundSize&&(d.style.backgroundSize=c.backgroundSize),c.backgroundImage&&(d.style.backgroundImage='url("'+c.backgroundImage+'")'),c.backgroundColor&&(d.style.backgroundColor=c.backgroundColor),c.backgroundRepeat&&(d.style.backgroundRepeat=c.backgroundRepeat),c.backgroundPosition&&(d.style.backgroundPosition=c.backgroundPosition),c.backgroundTransition&&d.setAttribute("data-background-transition",c.backgroundTransition),b.appendChild(d),d}q()&&document.body.classList.add("print-pdf"),cc.background.innerHTML="",cc.background.classList.add("no-transition"),l(document.querySelectorAll(Xb)).forEach(function(b){var c;c=q()?a(b,b):a(b,cc.background),l(b.querySelectorAll("section")).forEach(function(b){q()?a(b,b):a(b,c)})}),$b.parallaxBackgroundImage?(cc.background.style.backgroundImage='url("'+$b.parallaxBackgroundImage+'")',cc.background.style.backgroundSize=$b.parallaxBackgroundSize,setTimeout(function(){cc.wrapper.classList.add("has-parallax-background")},1)):(cc.background.style.backgroundImage="",cc.wrapper.classList.remove("has-parallax-background"))}function h(a){var b=document.querySelectorAll(Wb).length;if(cc.wrapper.classList.remove($b.transition),"object"==typeof a&&k($b,a),dc.transforms3d===!1&&($b.transition="linear"),cc.wrapper.classList.add($b.transition),cc.wrapper.setAttribute("data-transition-speed",$b.transitionSpeed),cc.wrapper.setAttribute("data-background-transition",$b.backgroundTransition),cc.controls.style.display=$b.controls?"block":"none",cc.progress.style.display=$b.progress?"block":"none",$b.rtl?cc.wrapper.classList.add("rtl"):cc.wrapper.classList.remove("rtl"),$b.center?cc.wrapper.classList.add("center"):cc.wrapper.classList.remove("center"),$b.mouseWheel?(document.addEventListener("DOMMouseScroll",Bb,!1),document.addEventListener("mousewheel",Bb,!1)):(document.removeEventListener("DOMMouseScroll",Bb,!1),document.removeEventListener("mousewheel",Bb,!1)),$b.rollingLinks?u():v(),$b.previewLinks?w():(x(),w("[data-preview-link]")),b>1&&$b.autoSlide&&$b.autoSlideStoppable&&dc.canvas&&dc.requestAnimationFrame?(Vb=new Ob(cc.wrapper,function(){return Math.min(Math.max((Date.now()-lc)/jc,0),1)}),Vb.on("click",Nb),mc=!1):Vb&&(Vb.destroy(),Vb=null),$b.theme&&cc.theme){var c=cc.theme.getAttribute("href"),d=/[^\/]*?(?=\.css)/,e=c.match(d)[0];$b.theme!==e&&(c=c.replace(d,$b.theme),cc.theme.setAttribute("href",c))}P()}function i(){if(ic=!0,window.addEventListener("hashchange",Ib,!1),window.addEventListener("resize",Jb,!1),$b.touch&&(cc.wrapper.addEventListener("touchstart",vb,!1),cc.wrapper.addEventListener("touchmove",wb,!1),cc.wrapper.addEventListener("touchend",xb,!1),window.navigator.msPointerEnabled&&(cc.wrapper.addEventListener("MSPointerDown",yb,!1),cc.wrapper.addEventListener("MSPointerMove",zb,!1),cc.wrapper.addEventListener("MSPointerUp",Ab,!1))),$b.keyboard&&document.addEventListener("keydown",ub,!1),$b.progress&&cc.progress,$b.focusBodyOnPageVisiblityChange){var a;"hidden"in document?a="visibilitychange":"msHidden"in document?a="msvisibilitychange":"webkitHidden"in document&&(a="webkitvisibilitychange"),a&&document.addEventListener(a,Kb,!1)}["touchstart","click"].forEach(function(a){cc.controlsLeft.forEach(function(b){b.addEventListener(a,Cb,!1)}),cc.controlsRight.forEach(function(b){b.addEventListener(a,Db,!1)}),cc.controlsUp.forEach(function(b){b.addEventListener(a,Eb,!1)}),cc.controlsDown.forEach(function(b){b.addEventListener(a,Fb,!1)}),cc.controlsPrev.forEach(function(b){b.addEventListener(a,Gb,!1)}),cc.controlsNext.forEach(function(b){b.addEventListener(a,Hb,!1)})})}function j(){ic=!1,document.removeEventListener("keydown",ub,!1),window.removeEventListener("hashchange",Ib,!1),window.removeEventListener("resize",Jb,!1),cc.wrapper.removeEventListener("touchstart",vb,!1),cc.wrapper.removeEventListener("touchmove",wb,!1),cc.wrapper.removeEventListener("touchend",xb,!1),window.navigator.msPointerEnabled&&(cc.wrapper.removeEventListener("MSPointerDown",yb,!1),cc.wrapper.removeEventListener("MSPointerMove",zb,!1),cc.wrapper.removeEventListener("MSPointerUp",Ab,!1)),$b.progress&&cc.progress,["touchstart","click"].forEach(function(a){cc.controlsLeft.forEach(function(b){b.removeEventListener(a,Cb,!1)}),cc.controlsRight.forEach(function(b){b.removeEventListener(a,Db,!1)}),cc.controlsUp.forEach(function(b){b.removeEventListener(a,Eb,!1)}),cc.controlsDown.forEach(function(b){b.removeEventListener(a,Fb,!1)}),cc.controlsPrev.forEach(function(b){b.removeEventListener(a,Gb,!1)}),cc.controlsNext.forEach(function(b){b.removeEventListener(a,Hb,!1)})})}function k(a,b){for(var c in b)a[c]=b[c]}function l(a){return Array.prototype.slice.call(a)}function m(a,b){var c=a.x-b.x,d=a.y-b.y;return Math.sqrt(c*c+d*d)}function n(a,b){a.style.WebkitTransform=b,a.style.MozTransform=b,a.style.msTransform=b,a.style.OTransform=b,a.style.transform=b}function o(a){var b=0;if(a){var c=0;l(a.childNodes).forEach(function(a){"number"==typeof a.offsetTop&&a.style&&("absolute"===a.style.position&&(c+=1),b=Math.max(b,a.offsetTop+a.offsetHeight))}),0===c&&(b=a.offsetHeight)}return b}function p(a,b){if(b=b||0,a){var c=a.parentNode,d=c.childNodes;l(d).forEach(function(c){if("number"==typeof c.offsetHeight&&c!==a){var d=window.getComputedStyle(c),e=parseInt(d.marginTop,10),f=parseInt(d.marginBottom,10);b-=c.offsetHeight+e+f}});var e=window.getComputedStyle(a);b-=parseInt(e.marginTop,10)+parseInt(e.marginBottom,10)}return b}function q(){return/print-pdf/gi.test(window.location.search)}function r(){$b.hideAddressBar&&Ub&&(window.addEventListener("load",s,!1),window.addEventListener("orientationchange",s,!1))}function s(){setTimeout(function(){window.scrollTo(0,1)},10)}function t(a,b){var c=document.createEvent("HTMLEvents",1,2);c.initEvent(a,!0,!0),k(c,b),cc.wrapper.dispatchEvent(c)}function u(){if(dc.transforms3d&&!("msPerspective"in document.body.style))for(var a=document.querySelectorAll(Wb+" a:not(.image)"),b=0,c=a.length;c>b;b++){var d=a[b];if(!(!d.textContent||d.querySelector("*")||d.className&&d.classList.contains(d,"roll"))){var e=document.createElement("span");e.setAttribute("data-title",d.text),e.innerHTML=d.innerHTML,d.classList.add("roll"),d.innerHTML="",d.appendChild(e)}}}function v(){for(var a=document.querySelectorAll(Wb+" a.roll"),b=0,c=a.length;c>b;b++){var d=a[b],e=d.querySelector("span");e&&(d.classList.remove("roll"),d.innerHTML=e.innerHTML)}}function w(a){var b=l(document.querySelectorAll(a?a:"a"));b.forEach(function(a){/^(http|www)/gi.test(a.getAttribute("href"))&&a.addEventListener("click",Mb,!1)})}function x(){var a=l(document.querySelectorAll("a"));a.forEach(function(a){/^(http|www)/gi.test(a.getAttribute("href"))&&a.removeEventListener("click",Mb,!1)})}function y(a){z(),cc.preview=document.createElement("div"),cc.preview.classList.add("preview-link-overlay"),cc.wrapper.appendChild(cc.preview),cc.preview.innerHTML=["<header>",'<a class="close" href="#"><span class="icon"></span></a>','<a class="external" href="'+a+'" target="_blank"><span class="icon"></span></a>',"</header>",'<div class="spinner"></div>','<div class="viewport">','<iframe src="'+a+'"></iframe>',"</div>"].join(""),cc.preview.querySelector("iframe").addEventListener("load",function(){cc.preview.classList.add("loaded")},!1),cc.preview.querySelector(".close").addEventListener("click",function(a){z(),a.preventDefault()},!1),cc.preview.querySelector(".external").addEventListener("click",function(){z()},!1),setTimeout(function(){cc.preview.classList.add("visible")},1)}function z(){cc.preview&&(cc.preview.setAttribute("src",""),cc.preview.parentNode.removeChild(cc.preview),cc.preview=null)}function A(){if(cc.wrapper&&!q()){var a=cc.wrapper.offsetWidth,b=cc.wrapper.offsetHeight;a-=b*$b.margin,b-=b*$b.margin;var c=$b.width,d=$b.height,e=20;B($b.width,$b.height,e),"string"==typeof c&&/%$/.test(c)&&(c=parseInt(c,10)/100*a),"string"==typeof d&&/%$/.test(d)&&(d=parseInt(d,10)/100*b),cc.slides.style.width=c+"px",cc.slides.style.height=d+"px",bc=Math.min(a/c,b/d),bc=Math.max(bc,$b.minScale),bc=Math.min(bc,$b.maxScale),"undefined"==typeof cc.slides.style.zoom||navigator.userAgent.match(/(iphone|ipod|ipad|android)/gi)?n(cc.slides,"translate(-50%, -50%) scale("+bc+") translate(50%, 50%)"):cc.slides.style.zoom=bc;for(var f=l(document.querySelectorAll(Wb)),g=0,h=f.length;h>g;g++){var i=f[g];"none"!==i.style.display&&(i.style.top=$b.center||i.classList.contains("center")?i.classList.contains("stack")?0:Math.max(-(o(i)/2)-e,-d/2)+"px":"")}U(),Y()}}function B(a,b,c){l(cc.slides.querySelectorAll("section > .stretch")).forEach(function(d){var e=p(d,b-2*c);if(/(img|video)/gi.test(d.nodeName)){var f=d.naturalWidth||d.videoWidth,g=d.naturalHeight||d.videoHeight,h=Math.min(a/f,e/g);d.style.width=f*h+"px",d.style.height=g*h+"px"}else d.style.width=a+"px",d.style.height=e+"px"})}function C(a,b){"object"==typeof a&&"function"==typeof a.setAttribute&&a.setAttribute("data-previous-indexv",b||0)}function D(a){if("object"==typeof a&&"function"==typeof a.setAttribute&&a.classList.contains("stack")){var b=a.hasAttribute("data-start-indexv")?"data-start-indexv":"data-previous-indexv";return parseInt(a.getAttribute(b)||0,10)}return 0}function E(){if($b.overview){kb();var a=cc.wrapper.classList.contains("overview"),b=window.innerWidth<400?1e3:2500;cc.wrapper.classList.add("overview"),cc.wrapper.classList.remove("overview-deactivating"),clearTimeout(gc),clearTimeout(hc),gc=setTimeout(function(){for(var c=document.querySelectorAll(Xb),d=0,e=c.length;e>d;d++){var f=c[d],g=$b.rtl?-105:105;if(f.setAttribute("data-index-h",d),n(f,"translateZ(-"+b+"px) translate("+(d-Pb)*g+"%, 0%)"),f.classList.contains("stack"))for(var h=f.querySelectorAll("section"),i=0,j=h.length;j>i;i++){var k=d===Pb?Qb:D(f),l=h[i];l.setAttribute("data-index-h",d),l.setAttribute("data-index-v",i),n(l,"translate(0%, "+105*(i-k)+"%)"),l.addEventListener("click",Lb,!0)}else f.addEventListener("click",Lb,!0)}T(),A(),a||t("overviewshown",{indexh:Pb,indexv:Qb,currentSlide:Sb})},10)}}function F(){$b.overview&&(clearTimeout(gc),clearTimeout(hc),cc.wrapper.classList.remove("overview"),cc.wrapper.classList.add("overview-deactivating"),hc=setTimeout(function(){cc.wrapper.classList.remove("overview-deactivating")},1),l(document.querySelectorAll(Wb)).forEach(function(a){n(a,""),a.removeEventListener("click",Lb,!0)}),O(Pb,Qb),jb(),t("overviewhidden",{indexh:Pb,indexv:Qb,currentSlide:Sb}))}function G(a){"boolean"==typeof a?a?E():F():H()?F():E()}function H(){return cc.wrapper.classList.contains("overview")}function I(a){return a=a?a:Sb,a&&a.parentNode&&!!a.parentNode.nodeName.match(/section/i)}function J(){var a=document.body,b=a.requestFullScreen||a.webkitRequestFullscreen||a.webkitRequestFullScreen||a.mozRequestFullScreen||a.msRequestFullScreen;b&&b.apply(a)}function K(){var a=cc.wrapper.classList.contains("paused");kb(),cc.wrapper.classList.add("paused"),a===!1&&t("paused")}function L(){var a=cc.wrapper.classList.contains("paused");cc.wrapper.classList.remove("paused"),jb(),a&&t("resumed")}function M(){N()?L():K()}function N(){return cc.wrapper.classList.contains("paused")}function O(a,b,c,d){Rb=Sb;var e=document.querySelectorAll(Xb);void 0===b&&(b=D(e[a])),Rb&&Rb.parentNode&&Rb.parentNode.classList.contains("stack")&&C(Rb.parentNode,Qb);var f=ac.concat();ac.length=0;var g=Pb||0,h=Qb||0;Pb=S(Xb,void 0===a?Pb:a),Qb=S(Yb,void 0===b?Qb:b),T(),A();a:for(var i=0,j=ac.length;j>i;i++){for(var k=0;k<f.length;k++)if(f[k]===ac[i]){f.splice(k,1);continue a}document.documentElement.classList.add(ac[i]),t(ac[i])}for(;f.length;)document.documentElement.classList.remove(f.pop());H()&&E();var m=e[Pb],n=m.querySelectorAll("section");Sb=n[Qb]||m,"undefined"!=typeof c&&gb(c);var o=Pb!==g||Qb!==h;o?t("slidechanged",{indexh:Pb,indexv:Qb,previousSlide:Rb,currentSlide:Sb,origin:d}):Rb=null,Rb&&(Rb.classList.remove("present"),document.querySelector(Zb).classList.contains("present")&&setTimeout(function(){var a,b=l(document.querySelectorAll(Xb+".stack"));for(a in b)b[a]&&C(b[a],0)},0)),o&&(ab(Rb),_(Sb)),W(),U(),X(),Y(),V(),db(),jb()}function P(){j(),i(),A(),jc=$b.autoSlide,jb(),g(),R(),W(),U(),X(!0),V()}function Q(){var a=l(document.querySelectorAll(Xb));a.forEach(function(a){var b=l(a.querySelectorAll("section"));b.forEach(function(a,b){b>0&&(a.classList.remove("present"),a.classList.remove("past"),a.classList.add("future"))})})}function R(){var a=l(document.querySelectorAll(Xb));a.forEach(function(a){var b=l(a.querySelectorAll("section"));b.forEach(function(a){fb(a.querySelectorAll(".fragment"))}),0===b.length&&fb(a.querySelectorAll(".fragment"))})}function S(a,b){var c=l(document.querySelectorAll(a)),d=c.length;if(d){$b.loop&&(b%=d,0>b&&(b=d+b)),b=Math.max(Math.min(b,d-1),0);for(var e=0;d>e;e++){var f=c[e],g=$b.rtl&&!I(f);if(f.classList.remove("past"),f.classList.remove("present"),f.classList.remove("future"),f.setAttribute("hidden",""),b>e){f.classList.add(g?"future":"past");for(var h=l(f.querySelectorAll(".fragment"));h.length;){var i=h.pop();i.classList.add("visible"),i.classList.remove("current-fragment")}}else if(e>b){f.classList.add(g?"past":"future");for(var j=l(f.querySelectorAll(".fragment.visible"));j.length;){var k=j.pop();k.classList.remove("visible"),k.classList.remove("current-fragment")}}f.querySelector("section")&&f.classList.add("stack")}c[b].classList.add("present"),c[b].removeAttribute("hidden");var m=c[b].getAttribute("data-state");m&&(ac=ac.concat(m.split(" ")))}else b=0;return b}function T(){var a,b,c=l(document.querySelectorAll(Xb)),d=c.length;if(d){var e=H()?10:$b.viewDistance;Ub&&(e=H()?6:1);for(var f=0;d>f;f++){var g=c[f],h=l(g.querySelectorAll("section")),i=h.length;if(a=Math.abs((Pb-f)%(d-e))||0,g.style.display=a>e?"none":"block",i)for(var j=D(g),k=0;i>k;k++){var m=h[k];b=Math.abs(f===Pb?Qb-k:k-j),m.style.display=a+b>e?"none":"block"}}}}function U(){if($b.progress&&cc.progress){var a=l(document.querySelectorAll(Xb)),b=document.querySelectorAll(Wb+":not(.stack)").length,c=0;a:for(var d=0;d<a.length;d++){for(var e=a[d],f=l(e.querySelectorAll("section")),g=0;g<f.length;g++){if(f[g].classList.contains("present"))break a;c++}if(e.classList.contains("present"))break;e.classList.contains("stack")===!1&&c++}cc.progressbar.style.width=c/(b-1)*window.innerWidth+"px"}}function V(){if($b.slideNumber&&cc.slideNumber){var a=Pb;Qb>0&&(a+=" - "+Qb),cc.slideNumber.innerHTML=a}}function W(){var a=Z(),b=$();cc.controlsLeft.concat(cc.controlsRight).concat(cc.controlsUp).concat(cc.controlsDown).concat(cc.controlsPrev).concat(cc.controlsNext).forEach(function(a){a.classList.remove("enabled"),a.classList.remove("fragmented")}),a.left&&cc.controlsLeft.forEach(function(a){a.classList.add("enabled")}),a.right&&cc.controlsRight.forEach(function(a){a.classList.add("enabled")}),a.up&&cc.controlsUp.forEach(function(a){a.classList.add("enabled")}),a.down&&cc.controlsDown.forEach(function(a){a.classList.add("enabled")}),(a.left||a.up)&&cc.controlsPrev.forEach(function(a){a.classList.add("enabled")}),(a.right||a.down)&&cc.controlsNext.forEach(function(a){a.classList.add("enabled")}),Sb&&(b.prev&&cc.controlsPrev.forEach(function(a){a.classList.add("fragmented","enabled")}),b.next&&cc.controlsNext.forEach(function(a){a.classList.add("fragmented","enabled")}),I(Sb)?(b.prev&&cc.controlsUp.forEach(function(a){a.classList.add("fragmented","enabled")}),b.next&&cc.controlsDown.forEach(function(a){a.classList.add("fragmented","enabled")})):(b.prev&&cc.controlsLeft.forEach(function(a){a.classList.add("fragmented","enabled")}),b.next&&cc.controlsRight.forEach(function(a){a.classList.add("fragmented","enabled")})))}function X(a){var b=null,c=$b.rtl?"future":"past",d=$b.rtl?"past":"future";if(l(cc.background.childNodes).forEach(function(e,f){Pb>f?e.className="slide-background "+c:f>Pb?e.className="slide-background "+d:(e.className="slide-background present",b=e),(a||f===Pb)&&l(e.childNodes).forEach(function(a,c){Qb>c?a.className="slide-background past":c>Qb?a.className="slide-background future":(a.className="slide-background present",f===Pb&&(b=a))})}),b){var e=Tb?Tb.getAttribute("data-background-hash"):null,f=b.getAttribute("data-background-hash");f&&f===e&&b!==Tb&&cc.background.classList.add("no-transition"),Tb=b}setTimeout(function(){cc.background.classList.remove("no-transition")},1)}function Y(){if($b.parallaxBackgroundImage){var a,b,c=document.querySelectorAll(Xb),d=document.querySelectorAll(Yb),e=cc.background.style.backgroundSize.split(" ");1===e.length?a=b=parseInt(e[0],10):(a=parseInt(e[0],10),b=parseInt(e[1],10));var f=cc.background.offsetWidth,g=c.length,h=-(a-f)/(g-1)*Pb,i=cc.background.offsetHeight,j=d.length,k=j>0?-(b-i)/(j-1)*Qb:0;cc.background.style.backgroundPosition=h+"px "+k+"px"}}function Z(){var a=document.querySelectorAll(Xb),b=document.querySelectorAll(Yb),c={left:Pb>0||$b.loop,right:Pb<a.length-1||$b.loop,up:Qb>0,down:Qb<b.length-1};if($b.rtl){var d=c.left;c.left=c.right,c.right=d}return c}function $(){if(Sb&&$b.fragments){var a=Sb.querySelectorAll(".fragment"),b=Sb.querySelectorAll(".fragment:not(.visible)");return{prev:a.length-b.length>0,next:!!b.length}}return{prev:!1,next:!1}}function _(a){a&&!bb()&&(l(a.querySelectorAll("video, audio")).forEach(function(a){a.hasAttribute("data-autoplay")&&a.play()}),l(a.querySelectorAll("iframe")).forEach(function(a){a.contentWindow.postMessage("slide:start","*")}),l(a.querySelectorAll('iframe[src*="youtube.com/embed/"]')).forEach(function(a){a.hasAttribute("data-autoplay")&&a.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*")}))}function ab(a){a&&(l(a.querySelectorAll("video, audio")).forEach(function(a){a.hasAttribute("data-ignore")||a.pause()}),l(a.querySelectorAll("iframe")).forEach(function(a){a.contentWindow.postMessage("slide:stop","*")}),l(a.querySelectorAll('iframe[src*="youtube.com/embed/"]')).forEach(function(a){a.hasAttribute("data-ignore")||"function"!=typeof a.contentWindow.postMessage||a.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*")}))}function bb(){return!!window.location.search.match(/receiver/gi)}function cb(){var a=window.location.hash,b=a.slice(2).split("/"),c=a.replace(/#|\//gi,"");if(isNaN(parseInt(b[0],10))&&c.length){var d=document.querySelector("#"+c);if(d){var e=Reveal.getIndices(d);O(e.h,e.v)}else O(Pb||0,Qb||0)}else{var f=parseInt(b[0],10)||0,g=parseInt(b[1],10)||0;(f!==Pb||g!==Qb)&&O(f,g)}}function db(a){if($b.history)if(clearTimeout(fc),"number"==typeof a)fc=setTimeout(db,a);else{var b="/";Sb&&"string"==typeof Sb.getAttribute("id")?b="/"+Sb.getAttribute("id"):((Pb>0||Qb>0)&&(b+=Pb),Qb>0&&(b+="/"+Qb)),window.location.hash=b}}function eb(a){var b,c=Pb,d=Qb;if(a){var e=I(a),f=e?a.parentNode:a,g=l(document.querySelectorAll(Xb));c=Math.max(g.indexOf(f),0),e&&(d=Math.max(l(a.parentNode.querySelectorAll("section")).indexOf(a),0))}if(!a&&Sb){var h=Sb.querySelectorAll(".fragment").length>0;if(h){var i=Sb.querySelectorAll(".fragment.visible");b=i.length-1}}return{h:c,v:d,f:b}}function fb(a){a=l(a);var b=[],c=[],d=[];a.forEach(function(a){if(a.hasAttribute("data-fragment-index")){var d=parseInt(a.getAttribute("data-fragment-index"),10);b[d]||(b[d]=[]),b[d].push(a)}else c.push([a])}),b=b.concat(c);var e=0;return b.forEach(function(a){a.forEach(function(a){d.push(a),a.setAttribute("data-fragment-index",e)}),e++}),d}function gb(a,b){if(Sb&&$b.fragments){var c=fb(Sb.querySelectorAll(".fragment"));if(c.length){if("number"!=typeof a){var d=fb(Sb.querySelectorAll(".fragment.visible")).pop();a=d?parseInt(d.getAttribute("data-fragment-index")||0,10):-1}"number"==typeof b&&(a+=b);var e=[],f=[];return l(c).forEach(function(b,c){b.hasAttribute("data-fragment-index")&&(c=parseInt(b.getAttribute("data-fragment-index"),10)),a>=c?(b.classList.contains("visible")||e.push(b),b.classList.add("visible"),b.classList.remove("current-fragment"),c===a&&b.classList.add("current-fragment")):(b.classList.contains("visible")&&f.push(b),b.classList.remove("visible"),b.classList.remove("current-fragment"))}),f.length&&t("fragmenthidden",{fragment:f[0],fragments:f}),e.length&&t("fragmentshown",{fragment:e[0],fragments:e}),W(),!(!e.length&&!f.length)}}return!1}function hb(){return gb(null,1)}function ib(){return gb(null,-1)}function jb(){if(kb(),Sb){var a=Sb.parentNode?Sb.parentNode.getAttribute("data-autoslide"):null,b=Sb.getAttribute("data-autoslide");jc=b?parseInt(b,10):a?parseInt(a,10):$b.autoSlide,l(Sb.querySelectorAll("video, audio")).forEach(function(a){a.hasAttribute("data-autoplay")&&jc&&1e3*a.duration>jc&&(jc=1e3*a.duration+1e3)}),!jc||mc||N()||H()||Reveal.isLastSlide()&&$b.loop!==!0||(kc=setTimeout(sb,jc),lc=Date.now()),Vb&&Vb.setPlaying(-1!==kc)}}function kb(){clearTimeout(kc),kc=-1}function lb(){mc=!0,clearTimeout(kc),Vb&&Vb.setPlaying(!1)}function mb(){mc=!1,jb()}function nb(){$b.rtl?(H()||hb()===!1)&&Z().left&&O(Pb+1):(H()||ib()===!1)&&Z().left&&O(Pb-1)}function ob(){$b.rtl?(H()||ib()===!1)&&Z().right&&O(Pb-1):(H()||hb()===!1)&&Z().right&&O(Pb+1)}function pb(){(H()||ib()===!1)&&Z().up&&O(Pb,Qb-1)}function qb(){(H()||hb()===!1)&&Z().down&&O(Pb,Qb+1)}function rb(){if(ib()===!1)if(Z().up)pb();else{var a=document.querySelector(Xb+".past:nth-child("+Pb+")");if(a){var b=a.querySelectorAll("section").length-1||void 0,c=Pb-1;O(c,b)}}}function sb(){hb()===!1&&(Z().down?qb():ob()),jb()}function tb(){$b.autoSlideStoppable&&lb()}function ub(a){tb(a);var b=(document.activeElement,!(!document.activeElement||!document.activeElement.type&&!document.activeElement.href&&"inherit"===document.activeElement.contentEditable));if(!(b||a.shiftKey&&32!==a.keyCode||a.altKey||a.ctrlKey||a.metaKey)){if(N()&&-1===[66,190,191].indexOf(a.keyCode))return!1;var c=!1;if("object"==typeof $b.keyboard)for(var d in $b.keyboard)if(parseInt(d,10)===a.keyCode){var e=$b.keyboard[d];"function"==typeof e?e.apply(null,[a]):"string"==typeof e&&"function"==typeof Reveal[e]&&Reveal[e].call(),c=!0}if(c===!1)switch(c=!0,a.keyCode){case 80:case 33:rb();break;case 78:case 34:sb();break;case 72:case 37:nb();break;case 76:case 39:ob();break;case 75:case 38:pb();break;case 74:case 40:qb();break;case 36:O(0);break;case 35:O(Number.MAX_VALUE);break;case 32:H()?F():a.shiftKey?rb():sb();break;case 13:H()?F():c=!1;break;case 66:case 190:case 191:M();break;case 70:J();break;default:c=!1}c?a.preventDefault():27!==a.keyCode&&79!==a.keyCode||!dc.transforms3d||(cc.preview?z():G(),a.preventDefault()),jb()}}function vb(a){nc.startX=a.touches[0].clientX,nc.startY=a.touches[0].clientY,nc.startCount=a.touches.length,2===a.touches.length&&$b.overview&&(nc.startSpan=m({x:a.touches[1].clientX,y:a.touches[1].clientY},{x:nc.startX,y:nc.startY}))}function wb(a){if(nc.captured)navigator.userAgent.match(/android/gi)&&a.preventDefault();else{tb(a);var b=a.touches[0].clientX,c=a.touches[0].clientY;if(2===a.touches.length&&2===nc.startCount&&$b.overview){var d=m({x:a.touches[1].clientX,y:a.touches[1].clientY},{x:nc.startX,y:nc.startY});Math.abs(nc.startSpan-d)>nc.threshold&&(nc.captured=!0,d<nc.startSpan?E():F()),a.preventDefault()}else if(1===a.touches.length&&2!==nc.startCount){var e=b-nc.startX,f=c-nc.startY;e>nc.threshold&&Math.abs(e)>Math.abs(f)?(nc.captured=!0,nb()):e<-nc.threshold&&Math.abs(e)>Math.abs(f)?(nc.captured=!0,ob()):f>nc.threshold?(nc.captured=!0,pb()):f<-nc.threshold&&(nc.captured=!0,qb()),$b.embedded?(nc.captured||I(Sb))&&a.preventDefault():a.preventDefault()}}}function xb(){nc.captured=!1}function yb(a){a.pointerType===a.MSPOINTER_TYPE_TOUCH&&(a.touches=[{clientX:a.clientX,clientY:a.clientY}],vb(a))}function zb(a){a.pointerType===a.MSPOINTER_TYPE_TOUCH&&(a.touches=[{clientX:a.clientX,clientY:a.clientY}],wb(a))}function Ab(a){a.pointerType===a.MSPOINTER_TYPE_TOUCH&&(a.touches=[{clientX:a.clientX,clientY:a.clientY}],xb(a))}function Bb(a){if(Date.now()-ec>600){ec=Date.now();var b=a.detail||-a.wheelDelta;b>0?sb():rb()}}function Cb(a){a.preventDefault(),tb(),nb()}function Db(a){a.preventDefault(),tb(),ob()}function Eb(a){a.preventDefault(),tb(),pb()}function Fb(a){a.preventDefault(),tb(),qb()}function Gb(a){a.preventDefault(),tb(),rb()}function Hb(a){a.preventDefault(),tb(),sb()}function Ib(){cb()}function Jb(){A()}function Kb(){var a=document.webkitHidden||document.msHidden||document.hidden;a===!1&&document.activeElement!==document.body&&(document.activeElement.blur(),document.body.focus())}function Lb(a){if(ic&&H()){a.preventDefault();for(var b=a.target;b&&!b.nodeName.match(/section/gi);)b=b.parentNode;if(b&&!b.classList.contains("disabled")&&(F(),b.nodeName.match(/section/gi))){var c=parseInt(b.getAttribute("data-index-h"),10),d=parseInt(b.getAttribute("data-index-v"),10);O(c,d)}}}function Mb(a){var b=a.target.getAttribute("href");b&&(y(b),a.preventDefault())}function Nb(){Reveal.isLastSlide()&&$b.loop===!1?(O(0,0),mb()):mc?mb():lb()}function Ob(a,b){this.diameter=50,this.thickness=3,this.playing=!1,this.progress=0,this.progressOffset=1,this.container=a,this.progressCheck=b,this.canvas=document.createElement("canvas"),this.canvas.className="playback",this.canvas.width=this.diameter,this.canvas.height=this.diameter,this.context=this.canvas.getContext("2d"),this.container.appendChild(this.canvas),this.render()}var Pb,Qb,Rb,Sb,Tb,Ub,Vb,Wb=".reveal .slides section",Xb=".reveal .slides>section",Yb=".reveal .slides>section.present>section",Zb=".reveal .slides>section:first-of-type",$b={width:960,height:700,margin:.1,minScale:.2,maxScale:1,controls:!0,progress:!0,slideNumber:!1,history:!1,keyboard:!0,overview:!0,center:!0,touch:!0,loop:!1,rtl:!1,fragments:!0,embedded:!1,autoSlide:0,autoSlideStoppable:!0,mouseWheel:!1,rollingLinks:!1,hideAddressBar:!0,previewLinks:!1,focusBodyOnPageVisiblityChange:!0,theme:null,transition:"default",transitionSpeed:"default",backgroundTransition:"default",parallaxBackgroundImage:"",parallaxBackgroundSize:"",viewDistance:3,dependencies:[]},_b=!1,ac=[],bc=1,cc={},dc={},ec=0,fc=0,gc=0,hc=0,ic=!1,jc=0,kc=0,lc=-1,mc=!1,nc={startX:0,startY:0,startSpan:0,startCount:0,captured:!1,threshold:40};return Ob.prototype.setPlaying=function(a){var b=this.playing;this.playing=a,!b&&this.playing?this.animate():this.render()},Ob.prototype.animate=function(){var a=this.progress;this.progress=this.progressCheck(),a>.8&&this.progress<.2&&(this.progressOffset=this.progress),this.render(),this.playing&&dc.requestAnimationFrameMethod.call(window,this.animate.bind(this))},Ob.prototype.render=function(){var a=this.playing?this.progress:0,b=this.diameter/2-this.thickness,c=this.diameter/2,d=this.diameter/2,e=14;this.progressOffset+=.1*(1-this.progressOffset);var f=-Math.PI/2+2*a*Math.PI,g=-Math.PI/2+2*this.progressOffset*Math.PI;this.context.save(),this.context.clearRect(0,0,this.diameter,this.diameter),this.context.beginPath(),this.context.arc(c,d,b+2,0,2*Math.PI,!1),this.context.fillStyle="rgba( 0, 0, 0, 0.4 )",this.context.fill(),this.context.beginPath(),this.context.arc(c,d,b,0,2*Math.PI,!1),this.context.lineWidth=this.thickness,this.context.strokeStyle="#666",this.context.stroke(),this.playing&&(this.context.beginPath(),this.context.arc(c,d,b,g,f,!1),this.context.lineWidth=this.thickness,this.context.strokeStyle="#fff",this.context.stroke()),this.context.translate(c-e/2,d-e/2),this.playing?(this.context.fillStyle="#fff",this.context.fillRect(0,0,e/2-2,e),this.context.fillRect(e/2+2,0,e/2-2,e)):(this.context.beginPath(),this.context.translate(2,0),this.context.moveTo(0,0),this.context.lineTo(e-2,e/2),this.context.lineTo(0,e),this.context.fillStyle="#fff",this.context.fill()),this.context.restore()},Ob.prototype.on=function(a,b){this.canvas.addEventListener(a,b,!1)},Ob.prototype.off=function(a,b){this.canvas.removeEventListener(a,b,!1)},Ob.prototype.destroy=function(){this.playing=!1,this.canvas.parentNode&&this.container.removeChild(this.canvas)},{initialize:a,configure:h,sync:P,slide:O,left:nb,right:ob,up:pb,down:qb,prev:rb,next:sb,navigateFragment:gb,prevFragment:ib,nextFragment:hb,navigateTo:O,navigateLeft:nb,navigateRight:ob,navigateUp:pb,navigateDown:qb,navigatePrev:rb,navigateNext:sb,layout:A,availableRoutes:Z,availableFragments:$,toggleOverview:G,togglePause:M,isOverview:H,isPaused:N,addEventListeners:i,removeEventListeners:j,getIndices:eb,getSlide:function(a,b){var c=document.querySelectorAll(Xb)[a],d=c&&c.querySelectorAll("section");return"undefined"!=typeof b?d?d[b]:void 0:c
},getPreviousSlide:function(){return Rb},getCurrentSlide:function(){return Sb},getScale:function(){return bc},getConfig:function(){return $b},getQueryHash:function(){var a={};location.search.replace(/[A-Z0-9]+?=([\w\.%-]*)/gi,function(b){a[b.split("=").shift()]=b.split("=").pop()});for(var b in a){var c=a[b];a[b]=unescape(c),"null"===c?a[b]=null:"true"===c?a[b]=!0:"false"===c?a[b]=!1:c.match(/^\d+$/)&&(a[b]=parseFloat(c))}return a},isFirstSlide:function(){return null==document.querySelector(Wb+".past")?!0:!1},isLastSlide:function(){return Sb?Sb.nextElementSibling?!1:I(Sb)&&Sb.parentNode.nextElementSibling?!1:!0:!1},isReady:function(){return _b},addEventListener:function(a,b,c){"addEventListener"in window&&(cc.wrapper||document.querySelector(".reveal")).addEventListener(a,b,c)},removeEventListener:function(a,b,c){"addEventListener"in window&&(cc.wrapper||document.querySelector(".reveal")).removeEventListener(a,b,c)}}}();