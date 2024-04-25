jQuery(document).ready(function($){
    $(".asset-scroll-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 6000,
        infinite: true,
        cssEase: 'linear',
    });

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