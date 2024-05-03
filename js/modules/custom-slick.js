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

const pageSlider = $(".industry-slider");
const pageSlide = pageSlider.children(".industry-slide").length;
let mobileMedia = function(){
    if(jQuery(window).width() <= 1023){   
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
jQuery(window).resize(function () { mobileMedia(); });
jQuery(document).on('ready load', function () { mobileMedia(); });
let desktop = function(){
    if(jQuery(window).width() >= 1024){ 
        if (pageSlide <= 4) {
            pageSlider.slick('unslick');
        }
        else{
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
}   
jQuery(window).resize(function () { desktop(); });
jQuery(document).on('ready load', function () { desktop(); });