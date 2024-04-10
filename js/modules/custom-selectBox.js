jQuery(document).ready(function($){
    $('select').selectBox({
        keepInViewport: false,
        menuSpeed: 'slow',
        mobile:  true,
        hideOnWindowScroll: true,
    });
    $(".selectBox, .selectBox-dropdown .selectBox-label").removeAttr('style');
});


jQuery(function($){
    function hidemySelectBox() {
       $(".mfp-wrap").on("scroll", function(){
            var selectBox = new SelectBox($('select'), settings = {});
            selectBox.hideMenus();
       });        
    }
    hidemySelectBox();
    const observer = new MutationObserver(function (mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                hidemySelectBox();
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
});