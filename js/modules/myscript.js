jQuery(document).ready(function($){

    $(".humburger-btn").on("click", function(e){
        e.preventDefault();
        $(this).toggleClass("open");
    });

    if($(window).width() <= 1023){
        let level1 = $("ul.main_menu > li.menu-item-has-children > a");
        level1.on("click", function(e){
            e.preventDefault();
            $(this).parent("li").siblings().children("a").removeClass("active");
            $(this).toggleClass("active");
            $(this).parent("li").siblings().children("ul").slideUp(900);
            $(this).siblings("ul").slideToggle(900);
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
});