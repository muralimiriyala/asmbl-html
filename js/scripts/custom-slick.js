


jQuery(function(){
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
