
jQuery(document).on("ready", function(){
    var _selftWidth = jQuery(window).width();
    const pageSlider = jQuery(".industry-slider");
let mobileSlick = function(){
    if(_selftWidth <= 1023){   
        pageSlider.each(function() {
            const _this = jQuery(this);
            const $status = _this.closest('.who-for-page').find(".industry-count");
            if (!_this.hasClass('slick-initialized')) {
                _this.on('init reInit afterChange', function(event, slick, currentSlide) {
                    let i = (currentSlide ? currentSlide : 0) + 1;
                    $status.text(i + '/' + slick.slideCount);
                });
                _this.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    prevArrow: '<div class="slick-arrow slick-prev flex flex-center"><span class="slick-arrows slick-prev-arrow"></span></div>',
                    nextArrow: '<div class="slick-arrow slick-next flex flex-center"><span class="slick-arrows slick-next-arrow"></span></div>',
                    dots: false,
                    speed: 1500,
                    infinite: false,
                    autoplay: false,
                    variableWidth: true,
                });
            }
        });
    } 
}
mobileSlick();
let desktopSlick = function(){
    if(_selftWidth >= 1024){ 
        pageSlider.each(function(){
            const _this = jQuery(this);
            const pageSlide = _this.children(".industry-slide").length;
            if (pageSlide <= 4 && _this.hasClass('slick-initialized')) {
                _this.slick('unslick');
            } else if (pageSlide > 4 && !_this.hasClass('slick-initialized')) {
                _this.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    prevArrow: '<div class="slick-arrow slick-prev flex flex-center"><span class="slick-arrows slick-prev-arrow"></span></div>',
                    nextArrow: '<div class="slick-arrow slick-next flex flex-center"><span class="slick-arrows slick-next-arrow"></span></div>',
                    dots: false,
                    speed: 1500,
                    infinite: false,
                    autoplay: false,
                    variableWidth: true,
                }); 
            }
        });
    }
}
desktopSlick();
jQuery(window).on('resize load', function () {
    var newScreenWidth = jQuery(window).width();
    if (newScreenWidth !== _selftWidth) {
        _selftWidth = newScreenWidth;
        mobileSlick();
      desktopSlick();

    }
  });
});
