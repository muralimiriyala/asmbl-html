
function menu(){
    if(window.matchMedia('(max-width: 935px)').matches) {
        jQuery(".humburger-btn").on("click", function(e){
            e.preventDefault();
            jQuery(this).toggleClass("open");
            jQuery(".h_mobile_overlay").toggleClass("open");
            jQuery(".header_right").slideToggle(900);
        });
        let level1 = jQuery("ul.main_menu > li.menu-item-has-children > a");
        level1.on("click", function(e){
            e.preventDefault();
            jQuery(this).parent("li").closest("ul.main_menu").siblings(".header_btns").toggleClass("off");
            jQuery(this).parent("li").siblings().toggleClass("sib").fadeToggle(100);
            jQuery(this).parent("li").siblings().children("a").removeClass("active");
            jQuery(this).toggleClass("active");
            jQuery(this).parent().siblings("li").find("ul").slideUp(800);
            jQuery(this).siblings("ul").slideToggle(800);
        });
        let level2 = jQuery("ul.main_menu > li > ul > li.menu-item-has-children > a");
        level2.on("click", function(e){
            e.preventDefault();
            jQuery(this).parent("li").siblings().children("a").removeClass("active");
            jQuery(this).toggleClass("active");
            // jQuery(this).parent().siblings("li").closest("ul").find("ul").slideUp(800);
            jQuery("ul.main_menu > li > ul > li.menu-item-has-children > ul").not($(this).siblings("ul")).slideUp(800);
            jQuery(this).siblings("ul").slideToggle(800);
        });

        let level3 = jQuery("ul.main_menu > li > ul > li > ul > li.menu-item-has-children > a");
        level3.on("click", function(e){
            e.preventDefault();
            jQuery(this).parent("li").siblings().children("a").removeClass("active");
            jQuery(this).toggleClass("active");
            jQuery("ul.main_menu > li > ul > li > ul > li.menu-item-has-children > ul").not(jQuery(this).siblings("ul")).slideUp(800);
            jQuery(this).siblings("ul").slideToggle(800);
        });
    }
}
jQuery(document).on("ready", function() { menu(); });

  