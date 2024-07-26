jQuery(function($){
    $(".opt-btns .opt-btn:first").addClass("selected");
    $(".ai-feature-image:first").addClass("active-slide");
    $(document).ready(function () {
        window.scrollTo(0, 0);
        c();
        u();
        t();
        j();
    });
    var v = 0;
    function u() {
        $("#screen2 .opt-btns .opt-btn").on("click", function (x) {
            var w = $("#screen2 .opt-btns .opt-btn").index(this);
            b(this, w);
        });
        $("#screen2 .opt-btns .opt-btn").on("keydown", function (w) {
            q(w);
        });
        window.onresize = function () {
            t();
            c();
        };
    }
    function t() {
        var x = "auto";
        var w = true;
        if ($(document).width() < 1200) {
            $("#screen2").addClass("scrolled");
            l(false, 0);
        } else {
            if (!$("#screen2").hasClass("scrolled")) {
                if (window.scrollY > 100) {
                    $("#screen2").addClass("scrolled");
                    s();
                    l(false, 1000);
                } else {
                    l(true, 0);
                }
            } else {
                if (window.scrollY > 100) {
                    l(false, 1000);
                } else {
                    $("#screen2").removeClass("scrolled");
                    l(true, 0);
                }
            }
            x = $("#screen6 .arrow-wrapper").outerWidth();
            w = false;
        }
        $("#screen6 .arrow-flag").width(x);
    }
    var n = {};
    function c() {
        n.group = document.querySelector("#screen2 .opt-btns");
        n.nodes = document.querySelectorAll("#screen2 .opt-btns .opt-btn");
        n.total = n.nodes.length;
        n.ease = Power1.easeInOut;
        n.boxes = [];
        for (var w = 0; w < n.total; w++) {
            var x = n.nodes[w];
            gsap.set(x, { x: 0 });
            n.boxes[w] = { x: x.offsetLeft, y: x.offsetTop, node: x };
        }
        $(document).off("scroll", f);
        if ($(document).width() >= 1200) {
            $(document).on("scroll", f);
        } else {
            l(false, 0);
            $("#screen2").addClass("scrolled");
        }
    }
    function j() {
        $("#screen4 .industry-card").on("click", function (w) {
            a(w.currentTarget);
        });
        $("#screen4 .details-slide .zm-icon-close").on("click", function (w) {
            m();
        });
        $("#screen4 .details-slide .zm-icon-close").on("keydown", function (w) {
            if (w.keyCode === 13) {
                m();
                $("#screen4 .industry-card").eq(e.activeIndex).focus();
            }
        });
        $("#screen4 .industry-card").on("keydown", function (w) {
            p(w);
        });
        $("#screen1 .screen1-container a").on("focus", function () {
            h.autoplay.stop();
        });
        $("#screen1 .screen1-container a").on("blur", function () {
            h.autoplay.start();
        });
        $(".blog-slide img").on("error", function (w) {
            $(w.currentTarget).addClass("error");
        });
    }
    function k() {
        $("#screen2").addClass("scrolled");
        var w = document.getElementById("screen2").offsetTop;
        window.scrollTo({ top: w - 64, behavior: "smooth" });
    }
    function i(x, w) {
        $("#screen2 .opt-btns .opt-btn").removeClass("selected").attr("tabindex", "-1").attr("aria-selected", "false");
        $("#screen2 .slide-blue-bg").hide();
        $(w).addClass("selected").attr("tabindex", "0").attr("aria-selected", "true");
    
        console.log("v", v);
    
        if (v !== x) {
            // Remove the active-slide class from all .ai-feature-image elements
            $("#screen2 .ai-feature-image").removeClass("active-slide");
        }
    
        v = x;
        // Add the active-slide class to the currently clicked element
        $(`#screen2 .ai-feature-image[data-image=${x}]`).addClass("active-slide");
    }    
    function q(w) {
        o(w, $("#screen2 .opt-btns .opt-btn"), b);
    }
    function b(x, w) {
        if ($("#screen2").hasClass("scrolled")) {
            if (v !== w) {
                i(w, x);
            }
        } else {
            k();
            i(w, x);
        }
    }
    function l(w, x) {
        setTimeout(function () {
            var y = $("#screen2 .slide-blue-bg");
            w ? y.show() : y.fadeOut();
        }, x);
    }
    function f() {
        if (window.scrollY === 0 && $("#screen2").hasClass("scrolled")) {
            hasExpandSection2 = false;
            $("#screen2").removeClass("scrolled");
            s();
            l(true, 1000);
        }
        if (window.scrollY > 120 && !$("#screen2").hasClass("scrolled")) {
            $("#screen2").addClass("scrolled");
            s();
            l(false, 1000);
        }
    }
    function s() {
        for (var z = 0; z < n.total; z++) {
            var B = n.boxes[z];
            var C = B.x;
            var A = B.y;
            B.x = B.node.offsetLeft;
            B.y = B.node.offsetTop;
            if (C === B.x && A === B.y) {
                continue;
            }
            var w = C - B.x;
            var D = A - B.y;
            gsap.fromTo(B.node, { x: w, y: D }, { duration: 1, x: 0, y: 0, ease: n.ease });
        }
    }
    function o(B, C, D) {
        var x = false;
        var A = C.length;
        var z = C.index(B.currentTarget);
        var w = z;
        switch (B.keyCode) {
            case 37:
            case 38:
                w = (w - 1 + A) % A;
                x = true;
                break;
            case 39:
            case 40:
                w = (w + 1 + A) % A;
                x = true;
                break;
            case 36:
                w = 0;
                x = true;
                break;
            case 35:
                w = A - 1;
                x = true;
                break;
            case 32:
            case 13:
                D(C.eq(w), w);
                break;
            default:
                break;
        }
        if (x) {
            B.stopPropagation();
            B.preventDefault();
            var y = C.eq(w);
            $(y).focus();
        }
    }
    function p(w) {
        o(w, $("#screen4 .industry-card"), a);
    }
    function a(w) {
        if ($(w).hasClass("active")) {
            m();
        } else {
            r(w);
        }
    }
    function m() {
        $("#screen4 .industry-card").removeClass("active").attr("tabindex", "0");
        $("#screen4").removeClass("show-pro-card");
        $("#screen4 .production-container").fadeOut();
        $("#screen4 .desc-container").fadeIn();
    }
    function r(x) {
        $("#screen4 .industry-card").removeClass("active").attr("tabindex", "-1");
        $(x).addClass("active");
        $(x).attr("tabindex", "0");
        $("#screen4").addClass("show-pro-card");
        $("#screen4 .desc-container").fadeOut();
        var w = $(x).attr("index");
        e.slideTo(Number(w), 500, false);
        $("#screen4 .production-container").fadeIn(400, function () {});
    }
});
