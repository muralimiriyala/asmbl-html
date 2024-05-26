var $ = jQuery.noConflict();
$(function(){
    const pageSlider = $(".industry-slider");
    let mobileSlick = function(){
        if($(window).width() <= 1023){   
            pageSlider.each(function() {
                const _this = $(this);
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
    let desktopSlick = function(){
        if($(window).width() >= 1024){ 
            pageSlider.each(function(){
                const _this = $(this);
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
    // Call the functions on window resize and document ready/load
    $(window).on('load', function () { desktopSlick(); mobileSlick(); });
    $(window).on('resize', function () { desktopSlick(); mobileSlick(); });
});
