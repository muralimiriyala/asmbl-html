function scrollWithOffset(target, offset) {
    if ($(target).offset() != null) {
        $("html, body").animate({ scrollTop: $(target).offset().top - offset }, 300);
    }
}

function handleStickyAndScrollspy() {
    var scrollTop = $(window).scrollTop();
    var headerHeight = $(".sticky-spyscroll-section").offset().top;
    var navbarHeight = $(".site-header").outerHeight();
    var lastSection = $("nav.spy-nav ul.linear-links li a").last().attr("href");
    var lastSectionBottom = $(lastSection).offset().top + $(lastSection).outerHeight();

    if (scrollTop >= headerHeight - navbarHeight && scrollTop <= lastSectionBottom - navbarHeight) {
        $(".sticky-spyscroll").css({ position: "fixed", top: navbarHeight + "px" });
    } else {
        $(".sticky-spyscroll").css({ position: "static", top: "0px" });
    }

    $("ul.linear-links li a").each(function () {
        var sectionId = $(this).attr("href");
        if ($(sectionId).length) {
            var sectionTop = $(sectionId).offset().top - navbarHeight - 1; // Adjusted calculation
            var sectionHeight = $(sectionId).outerHeight();
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                $("ul.linear-links li a").removeClass("active");
                $(this).addClass("active");
            }
        }
    });

    if (scrollTop >= lastSectionBottom - $(window).height()) {
        $("ul.linear-links li a").removeClass("active");
        $("nav.spy-nav ul.linear-links li a").last().addClass("active");
    }
}


$(document).ready(function () {
    var navbarHeight = $(".site-header").outerHeight();

    $("nav.spy-nav ul.linear-links li a").on("click", function (e) {
        e.preventDefault();
        var target = this.hash;
        scrollWithOffset(target, navbarHeight);
        $("nav.spy-nav ul.linear-links li a").removeClass("active");
        $(this).addClass("active");
    });

    $(window).on("scroll", function () {
        handleStickyAndScrollspy();
    });

    $(window).on("resize", function () {
        handleStickyAndScrollspy();
    });

    handleStickyAndScrollspy();
});

function checkSpyScrollPosition() {
    var spyScroll = $("nav.spy-nav");
    var spyListScrollWidth = $("nav.spy-nav ul").innerWidth();
    var blockwidth = spyListScrollWidth / 5;
    var scrollLeft = spyScroll.scrollLeft();
    var navWidth = spyScroll.width();
    var ulWidth = spyScroll.find("ul").width();
    var maxScrollLeft = ulWidth - navWidth;

    if (navWidth === ulWidth) {
        $(".spy-arrow-prev").hide();
        $(".spy-arrow-next").hide();
    } else if (scrollLeft <= 0) {
        $(".spy-arrow-prev").hide();
        $(".spy-arrow-next").show();
    } else if (scrollLeft >= maxScrollLeft) {
        $(".spy-arrow-prev").show();
        $(".spy-arrow-next").hide();
    } else {
        $(".spy-arrow-prev").show();
        $(".spy-arrow-next").show();
    }
}

$(".spy-arrow-next").click(function () {
    var blockwidth = $("nav.spy-nav ul").innerWidth() / 5;
    $("nav.spy-nav").animate({ scrollLeft: "+=" + blockwidth }, 250, checkSpyScrollPosition);
});

$(".spy-arrow-prev").click(function () {
    var blockwidth = $("nav.spy-nav ul").innerWidth() / 5;
    $("nav.spy-nav").animate({ scrollLeft: "-=" + blockwidth }, 250, checkSpyScrollPosition);
});

$(window).on("scroll resize", checkSpyScrollPosition);
checkSpyScrollPosition();