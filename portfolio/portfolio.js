/*! majodev.github.io - v0.9.0 - build 2014-10-20 14:59:54 */
function checkPaginatorVisibility(){var a=Reveal.availableRoutes();a.left?($paginatorLeft.attr("data-state",""),$paginatorLeft.tooltip(toolTipOptions)):($paginatorLeft.attr("data-state","disabled"),$paginatorLeft.tooltip("destroy")),a.right?($paginatorRight.attr("data-state",""),$paginatorRight.tooltip(toolTipOptions)):($paginatorRight.attr("data-state","disabled"),$paginatorRight.tooltip("destroy")),a.up?($paginatorUp.attr("data-state",""),$paginatorUp.tooltip(toolTipOptions)):($paginatorUp.attr("data-state","disabled"),$paginatorUp.tooltip("destroy")),a.down?($paginatorDown.attr("data-state",""),$paginatorDown.tooltip(toolTipOptions)):($paginatorDown.attr("data-state","disabled"),$paginatorDown.tooltip("destroy"))}Reveal.initialize({controls:!1,progress:!0,slideNumber:!1,history:!0,keyboard:!0,overview:!1,center:!0,touch:!0,loop:!1,rtl:!1,fragments:!0,embedded:!0,autoSlide:0,autoSlideStoppable:!0,mouseWheel:!1,hideAddressBar:!0,previewLinks:!1,transition:"default",transitionSpeed:"default",backgroundTransition:"default",viewDistance:3,parallaxBackgroundImage:"",parallaxBackgroundSize:""}),Reveal.configure({keyboard:{66:null,190:null,191:null,70:null}});var $paginatorLeft=$(".paginate-flex-button.left"),$paginatorRight=$(".paginate-flex-button.right"),$paginatorUp=$(".paginate-flex-button.up"),$paginatorDown=$(".paginate-flex-button.down"),toolTipOptions={container:"body",delay:{show:50,hide:150}};Reveal.addEventListener("ready",function(){$paginatorLeft.show(),$paginatorRight.show(),$paginatorUp.show(),$paginatorDown.show(),$paginatorLeft.on("click",function(){Reveal.navigateLeft(),this.blur()}),$paginatorRight.on("click",function(){Reveal.navigateRight(),this.blur()}),$paginatorUp.on("click",function(){Reveal.navigateUp(),this.blur()}),$paginatorDown.on("click",function(){Reveal.navigateDown(),this.blur()}),checkPaginatorVisibility()}),Reveal.addEventListener("slidechanged",function(){checkPaginatorVisibility()}),window.dealloc=function(){$paginatorLeft.tooltip("destroy"),$paginatorRight.tooltip("destroy"),$paginatorUp.tooltip("destroy"),$paginatorDown.tooltip("destroy"),$paginatorLeft.off(),$paginatorRight.off(),$paginatorUp.off(),$paginatorDown.off(),Reveal.removeEventListeners(),Reveal=null};