jQuery(document).ready(function(){
    jQuery('.prod-overview-section').each(function(index){
        var $container = jQuery(this);
        var $imageSlider = $container.find('.prod-image-slider');
        var $contentSlider = $container.find('.prod-content-slider');
        $imageSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            asNavFor:  $contentSlider,
        });
        $contentSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: $imageSlider,
            dots: false,
            arrows: false,
            focusOnSelect: true,
            fade: true,
            cssEase: 'linear',
        });
        $container.find('ul.prod-tab-links li a[data-slide]').on("click", function(e){
            e.preventDefault();
            jQuery(this).parent("li").siblings().removeClass("prod-tab-active");
            jQuery(this).parent("li").addClass("prod-tab-active");
            var slideno = jQuery(this).data('slide');
            $contentSlider.slick('slickGoTo', slideno - 1);
        });
    });
});