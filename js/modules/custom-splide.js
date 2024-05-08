const Splider = jQuery(".asset-scroll-slider");
let mobileSplide = function () {
    if (jQuery(window).width() <= 1299) {
        new Splide(Splider[0], {
            type: "loop",
            drag: "free",
            focus: "left",
            perPage: 6,
            fixedWidth: "256px",
            autoScroll: {
                speed: 1
            },
            arrows: false,
            pagination: false
        }).mount(window.splide.Extensions);
    }
}
jQuery(document).on('ready load', function () { mobileSplide(); });

let desktopSplide = function () {
    if (jQuery(window).width() >= 1300) {
        const pageSplide = Splider.find('.splide__slide').length;
        console.log(pageSplide)
        if (pageSplide <= 4) {
            new Splide(Splider[0],{
                destroy: true,
            }).mount(window.splide.Extensions);
            
        } else {
            new Splide(Splider[0],{
                type: "loop",
                drag: "free",
                focus: "left",
                perPage: 1,
                fixedWidth: "256px",
                autoScroll: {
                    speed: 1
                },
                arrows: false,
                pagination: false
            }).mount(window.splide.Extensions);
        }
    }
}
jQuery(document).on('ready load', function () { desktopSplide(); });
