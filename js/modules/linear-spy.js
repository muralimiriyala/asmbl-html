function scrollWithOffset(target, offset) {
    if (jQuery(target).offset() != null) {
        jQuery("html, body").animate({ scrollTop: jQuery(target).offset().top - offset }, 300);
    }
}

function handleStickyAndScrollspy() {
    var scrollTop = jQuery(window).scrollTop();
    var headerHeight = jQuery(".sticky-spyscroll-section").offset().top;
    var navbarHeight = jQuery(".site-header").outerHeight();
    var lastSection = jQuery("nav.spy-nav ul.linear-links li a").last().attr("href");
    var lastSectionBottom = jQuery(lastSection).offset().top + jQuery(lastSection).outerHeight();

    if (scrollTop >= headerHeight - navbarHeight && scrollTop <= lastSectionBottom - navbarHeight) {
        jQuery(".sticky-spyscroll").css({ position: "fixed", top: navbarHeight + "px" });
    } else {
        jQuery(".sticky-spyscroll").css({ position: "static", top: "0px" });
    }

    jQuery("ul.linear-links li a").each(function () {
        var sectionId = jQuery(this).attr("href");
        if (jQuery(sectionId).length) {
            var sectionTop = jQuery(sectionId).offset().top - navbarHeight - 1; // Adjusted calculation
            var sectionHeight = jQuery(sectionId).outerHeight();
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                jQuery("ul.linear-links li a").removeClass("active");
                jQuery(this).addClass("active");
            }
        }
    });

    if (scrollTop >= lastSectionBottom - jQuery(window).height()) {
        jQuery("ul.linear-links li a").removeClass("active");
        jQuery("nav.spy-nav ul.linear-links li a").last().addClass("active");
    }
}


jQuery(document).ready(function(){
    var navbarHeight = jQuery(".site-header").outerHeight();

    jQuery("nav.spy-nav ul.linear-links li a").on("click", function (e) {
        e.preventDefault();
        var target = this.hash;
        scrollWithOffset(target, navbarHeight);
        jQuery("nav.spy-nav ul.linear-links li a").removeClass("active");
        jQuery(this).addClass("active");
    });

    jQuery(window).on("scroll", function () {
        handleStickyAndScrollspy();
    });

    jQuery(window).on("resize", function () {
        handleStickyAndScrollspy();
    });
    handleStickyAndScrollspy();
});

function checkSpyScrollPosition() {
    var spyScroll = jQuery("nav.spy-nav");
    var spyListScrollWidth = jQuery("nav.spy-nav ul").innerWidth();
    var blockwidth = spyListScrollWidth / 5;
    var scrollLeft = spyScroll.scrollLeft();
    var navWidth = spyScroll.width();
    var ulWidth = spyScroll.find("ul").width();
    var maxScrollLeft = ulWidth - navWidth;

    if (navWidth === ulWidth) {
        jQuery(".spy-arrow-prev").hide();
        jQuery(".spy-arrow-next").hide();
    } else if (scrollLeft <= 0) {
        jQuery(".spy-arrow-prev").hide();
        jQuery(".spy-arrow-next").show();
    } else if (scrollLeft >= maxScrollLeft) {
        jQuery(".spy-arrow-prev").show();
        jQuery(".spy-arrow-next").hide();
    } else {
        jQuery(".spy-arrow-prev").show();
        jQuery(".spy-arrow-next").show();
    }
}

jQuery(".spy-arrow-next").click(function () {
    var blockwidth = jQuery("nav.spy-nav ul").innerWidth() / 5;
    jQuery("nav.spy-nav").animate({ scrollLeft: "+=" + blockwidth }, 250, checkSpyScrollPosition);
});

jQuery(".spy-arrow-prev").click(function () {
    var blockwidth = jQuery("nav.spy-nav ul").innerWidth() / 5;
    jQuery("nav.spy-nav").animate({ scrollLeft: "-=" + blockwidth }, 250, checkSpyScrollPosition);
});

jQuery(window).on("scroll resize", checkSpyScrollPosition);
checkSpyScrollPosition();
