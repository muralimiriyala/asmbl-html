jQuery(document).ready(function($){
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
});