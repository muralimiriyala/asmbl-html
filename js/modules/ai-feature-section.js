jQuery(document).ready(function(){
    jQuery('.ai-feature-section').each(function(index){
        const $prodSlide = jQuery(this);
        jQuery(".ai-art-bg:first-child").addClass("active");
        jQuery(".ai-art-bg:first-child .ai-art-head").addClass("open");
        jQuery(".ai-art-bg:first-child .ai-art-content").slideDown(500);
        jQuery('.ai-image-list:first-child').addClass('active-slide');

        $prodSlide.find(".ai-art-head").on("click", function(e){
            e.preventDefault();
            jQuery(this).parent().toggleClass('active');
            jQuery(this).parent().siblings().removeClass('active');
            jQuery(this).parent().siblings().find('.ai-art-head').removeClass('open');
            jQuery(this).toggleClass("open");
            jQuery(this).siblings('.ai-art-content').slideToggle(500);
            jQuery(this).parent().siblings().find('.ai-art-content').slideUp(500);

            /*-- slide --*/
            let data = jQuery(this).data("name");
            $prodSlide.find('.ai-image-list').removeClass('active-slide');
            $prodSlide.find('.ai-image-list[data-image="' + data + '"]').addClass('active-slide');
        });
    });
    jQuery('.ai-feature-section').each(function(index){
        var $container = jQuery(this);
        var $imageSlider = $container.find('.ai-image-slider');
        var $contentSlider = $container.find('.ai-content-slider');
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
        $container.find('ul.ai-tab-links li a[data-slide]').on("click", function(e){
            e.preventDefault();
            jQuery(this).parent("li").siblings().removeClass("ai-tab-active");
            jQuery(this).parent("li").addClass("ai-tab-active");
            var slideno = jQuery(this).data('slide');
            $contentSlider.slick('slickGoTo', slideno - 1);
        });
    });
});