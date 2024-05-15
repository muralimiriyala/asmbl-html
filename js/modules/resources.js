
jQuery(document).ready(function(){

    // $("button.res-srch-icon").on('click', function(e){
    //     e.preventDefault();
    //     $(".res-dropdown-main").toggleClass('fade');
    //     $(".res-srch-form").toggleClass("open");
    // });

    jQuery(".res-dropdown").on('click', function(e){
        e.preventDefault();
        jQuery(this).parent().siblings(".res-dropdown-pos").find(".res-dropdown").removeClass("open");
        jQuery(this).toggleClass("open");
        jQuery(this).parent().siblings(".res-dropdown-pos").find(".res-tags-list").fadeOut(500);
        jQuery(this).siblings(".res-tags-main").find(".res-tags-list").fadeToggle(500);
    });
    // $("body").on("click", function(e){
    //     if(!$(e.target).closest("button.res-srch-icon, .res-srch-form, res-dropdown-main").length){
    //         $(".res-dropdown-main").removeClass('fade');
    //         $(".res-srch-form").removeClass("open");
    //     }
    // });
});

function srchResize(){
    if (window.matchMedia('(min-width: 768px)').matches) {
        jQuery("button.res-srch-icon").on('click', function(e){
            e.preventDefault();
            jQuery(".res-dropdown-main").toggleClass('fade');
            jQuery(".res-srch-form").toggleClass("open");
        });
    } 
}
jQuery(document).on("ready", function(){srchResize()});
jQuery(document).on("load", function(){srchResize()});
jQuery(document).on("resize", function(){srchResize()});