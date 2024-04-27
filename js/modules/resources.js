
jQuery(document).ready(function($){
    $("button.res-srch-icon").on('click', function(e){
        e.preventDefault();
        $(".res-dropdown-main").toggleClass('fade');
        $(".res-srch-form").toggleClass("open");
    });
    $(".res-dropdown").on('click', function(e){
        e.preventDefault();

        $(this).parent().siblings(".res-dropdown-pos").find(".res-dropdown").removeClass("open");
        $(this).toggleClass("open");
        $(this).parent().siblings(".res-dropdown-pos").find(".res-tags-list").fadeOut(500);
        $(this).siblings(".res-tags-main").find(".res-tags-list").fadeToggle(500);
      
    });
});