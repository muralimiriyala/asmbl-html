
jQuery(function(){


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
            focusOnSelect: true,
            accessibility: true,
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
            focusOnSelect: false,
            accessibility: true,
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
});

