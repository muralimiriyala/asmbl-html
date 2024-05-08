jQuery(document).ready(function($){



  
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