
jQuery(document).ready(function($){
 var s_header = document.querySelector(".site-header");
 var s_height = s_header.clientHeight;
    var stickySidebar = new StickySidebar('.aside-sticky', {
        topSpacing: s_height,
        // bottomSpacing: s_height,
        resizeSensor: true,
        containerSelector: false,
        innerWrapperSelector: '.sticky-sidebar',
     });
});