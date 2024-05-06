
function menu(){
    if(window.matchMedia('(max-width: 1023px)').matches) {
        $(".humburger-btn").on("click", function(e){
            e.preventDefault();
            $(this).toggleClass("open");
            $(".h_mobile_overlay").toggleClass("open");
            $(".header_right").slideToggle(900);
        });

        let level1 = $("ul.main_menu > li.menu-item-has-children > a");
        level1.on("click", function(e){
            e.preventDefault();
            $(this).parent("li").closest("ul.main_menu").siblings(".header_btns").toggleClass("off");
            $(this).parent("li").siblings().toggleClass("sib").fadeToggle(100);
            $(this).parent("li").siblings().children("a").removeClass("active");
            $(this).toggleClass("active");
            $(this).parent().siblings("li").find("ul").slideUp(800);
            $(this).siblings("ul").slideToggle(800);
        });
        let level2 = $("ul.main_menu > li > ul > li.menu-item-has-children > a");
        level2.on("click", function(e){
            e.preventDefault();
            $(this).parent("li").siblings().children("a").removeClass("active");
            $(this).toggleClass("active");
            // $(this).parent().siblings("li").closest("ul").find("ul").slideUp(800);
            $("ul.main_menu > li > ul > li.menu-item-has-children > ul").not($(this).siblings("ul")).slideUp(800);
            $(this).siblings("ul").slideToggle(800);
        });

        let level3 = $("ul.main_menu > li > ul > li > ul > li.menu-item-has-children > a");
        level3.on("click", function(e){
            e.preventDefault();
            $(this).parent("li").siblings().children("a").removeClass("active");
            $(this).toggleClass("active");
            $("ul.main_menu > li > ul > li > ul > li.menu-item-has-children > ul").not($(this).siblings("ul")).slideUp(800);
            $(this).siblings("ul").slideToggle(800);
        });
    }
}
jQuery(document).ready(function() { menu(); });

  