/*! majodev.github.io - v1.0.0 - build 2016-10-29 19:45:36 */
var container=document.querySelector("#masonryContainer"),msnry=new Masonry(container,{itemSelector:".masonryItem"}),imgLoad=imagesLoaded(container);imgLoad.on("progress",function(){msnry.layout()}),imgLoad.on("done",function(){msnry.layout()});