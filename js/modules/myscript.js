jQuery(document).ready(function($){

    $(".humburger-btn").on("click", function(e){
        e.preventDefault();
        $(this).toggleClass("open");
        $(".h_mobile_overlay").toggleClass("open");
        $(".header_right").slideToggle(900);
    });

    if($(window).width() <= 1023){
        let level1 = $("ul.main_menu > li.menu-item-has-children > a");
        level1.on("click", function(e){
            e.preventDefault();
            $(this).parent("li").siblings().toggleClass("sib").fadeToggle(100);
            $(this).parent("li").siblings().children("a").removeClass("active");
            $(this).toggleClass("active");
            $(this).parent("li").siblings().children("ul").slideUp(800);
            $(this).siblings("ul").slideToggle(800);
        });
        let level2 = $("ul.main_menu > li.menu-item-has-children > ul > li > a");
        level2.on("click", function(e){
            e.preventDefault();
            $(this).parent("li").siblings().children("ul").slideUp(800);
            $(this).siblings("ul").slideToggle(800);
        });
    }

    $('.accordion-header').on('click', function(e){
        e.preventDefault();
        $(this).parent().toggleClass('active');
        $(this).parent().siblings().removeClass('active');
        $(this).parent().siblings().find('.accordion-header').removeClass('open');
        $(this).toggleClass("open");
        $(this).siblings('.accordion-content').slideToggle(500);
        $(this).parent().siblings().find('.accordion-content').slideUp(500);
    });

    $(".faqs-category-btn").on('click', function(e){
        e.preventDefault();
        $(this).toggleClass("active");
        $("ul.faqs-links").slideToggle(900)
    });

    $(".prod-art-title").on("click", function(e){
        e.preventDefault();
        $(this).parent().toggleClass('active');
        $(this).parent().siblings().removeClass('active');
        $(this).parent().siblings().find('.prod-art-title').removeClass('open');
        $(this).toggleClass("open");
        $(this).siblings('.prod-art-content').slideToggle(500);
        $(this).parent().siblings().find('.prod-art-content').slideUp(500);
    });

    

});