jQuery(document).ready(function($){
    var _windowWidth = $(window).width();
    $(".client-slider-1").slick({
        slidesPerRow: 2,
		slidesToShow: 2,
        vertical: true,
        verticalSwiping: true,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 6000,
        arrows: false,
        focusOnSelect: true,
        // dots: false,
    });

    function nameSlider(){
    const pageSlider = $(".industry-slider");
    
const pageSlide = pageSlider.children(".industry-slide").length;
const isMobile = _windowWidth <= 1024;

if (!isMobile && pageSlide <= 4) {
    if (pageSlider.hasClass('slick-initialized')) {
        pageSlider.slick('unslick');
    }
} else if (!isMobile && pageSlide >= 4) {
    pageSlider.slick({
        slidesToShow: 4,
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
} else if (isMobile && pageSlide >= 4) {
    pageSlider.slick({
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
    }
    nameSlider();

$(window).on('resize load', function () {
    var newScreenWidth = $(window).width();
    if (newScreenWidth !== _windowWidth) {
      _windowWidth = newScreenWidth;
      nameSlider();
  
    }
  });


});