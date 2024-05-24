jQuery(document).ready(function(){
    // Slider up initialization
    var $sliderup = jQuery(".client-slider-up");
    if ($sliderup.length > 0) {
        var $slidesup = $sliderup.children('.client-logo-slide');
        $slidesup.slice(0, 3).clone().appendTo($sliderup);
        $sliderup.slick({
            arrows: false,
            dots: false,
            vertical: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            verticalSwiping: true,
            infinite: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 0,
            speed: 2000, 
            pauseOnHover: false,
            pauseOnFocus: false, 
            responsive: [
                {
                  breakpoint: 767,
                  settings: {
                      vertical: false,
                      verticalSwiping: false,
                      variableWidth: true,
                  }
                },
            ], 
        });
    }

    // Slider down initialization
    var $sliderdown = jQuery(".client-slider-down");
    if ($sliderdown.length > 0) {
        var $slidesdown = $sliderdown.children('.client-logo-slide');
        $slidesdown.slice(0, 3).clone().appendTo($sliderdown);
        $sliderdown.slick({
            arrows: false,
            dots: false,
            vertical: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            verticalSwiping: true,
            infinite: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 0, 
            speed: 2000, 
            pauseOnHover: false,
            pauseOnFocus: false,    
            responsive: [
                {
                  breakpoint: 767,
                  settings: {
                      vertical: false,
                      verticalSwiping: false,
                      variableWidth: true,
                  }
                },
            ], 
        });
    }

    // Industry slider initialization
    const pageSlider = jQuery(".industry-slider");
    var $status = jQuery(".industry-count");
    const pageSlide = pageSlider.children(".industry-slide").length;
    let mobileMedia = function(){
        if(jQuery(window).width() <= 1023){   
            pageSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                let i = (currentSlide ? currentSlide : 0) + 1;
                $status.text(i + '/' + slick.slideCount);
            });
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
    jQuery(document).on('ready', function () { mobileMedia(); });
    jQuery(window).on('load', function () { mobileMedia(); });

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
    jQuery(document).on('ready', function () { desktop(); });
    jQuery(window).on('load', function () { desktop(); });
});
