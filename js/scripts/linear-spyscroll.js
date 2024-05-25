function scrollWithOffset(t, o) {
  null != $(t).offset() && $("html, body").animate({ scrollTop: $(t).offset().top - o }, 300);
}
function scrollHiddenWithOffset(t, o) {
  null != $(t).offset() && $("html, body").animate({ scrollTop: $(t).offset().top - o }, 300);
}
function scrollWithExtraOffset(t, o) {
  null != $(t).offset() && $("html, body").animate({ scrollTop: $(t).offset().top }, 300);
}
if ($("#subnav").length) {
  var navOffset = 2 * $("#subnav").height();
  if ($(".notification-bar").length) {
      var notificationbarheight = $(".notification-bar").height();
      navOffset += notificationbarheight;
  }
  $("body").scrollspy({ offset: navOffset + 1, target: "#subnav" }),
      $('#subnav a[href^="#"]').on("click", function (t) {
          t.preventDefault(), scrollWithOffset(this.hash, navOffset);
      });
}
if (
  ($(".scrollto").length &&
      $(".scrollto").on("click", function (t) {
          var o = $("#topbar").height();
          t.preventDefault(), scrollWithOffset(this.hash, o);
      }),
  $(".scrolltofeature").length &&
      $(".scrolltofeature").on("click", function (t) {
          var o = $("#topbar").height();
          scrollWithExtraOffset(this.hash, o);
      }),
  $(".scrolltonooffset").length &&
      $(".scrolltonooffset").on("click", function (t) {
          t.preventDefault(), scrollWithOffset(this.hash, 0);
      }),
  window.location.hash && window.location.href.indexOf("nominees") > -1)
) {
  var hash = window.location.hash;
  navOffset = $("#topbar").height();
  $(hash).length && $("html, body").animate({ scrollTop: $(hash).offset().top - navOffset - 64 }, 300);
}
"" != window.location.hash &&
  "#nominees" == window.location.hash &&
  setTimeout(function () {
      document.getElementById("nom").click(), history.pushState({}, null, window.location.href.replace(window.location.hash, ""));
  }, 300),
  "" != window.location.hash &&
      "#winners" == window.location.hash &&
      setTimeout(function () {
          document.getElementById("nom").click(), history.pushState({}, null, window.location.href.replace(window.location.hash, ""));
      }, 300),
  "" != window.location.hash &&
      "#main" == window.location.hash &&
      ((document.getElementById("bsa-backto").href = "https://www.bynder.com/en/bynder-spotlight-awards/#winners"),
      (document.getElementById("bsa-backto2").href = "https://www.bynder.com/en/bynder-spotlight-awards/#winners"),
      (document.getElementById("bsa-navcrumb").href = "https://www.bynder.com/en/bynder-spotlight-awards/"),
      history.pushState({}, null, window.location.href.replace(window.location.hash, ""))),
  "" != window.location.hash &&
      "#judges" == window.location.hash &&
      ((document.getElementById("bsa-backto").href = "https://www.bynder.com/en/bynder-spotlight-awards/judges-area/#nominees"),
      (document.getElementById("bsa-backto2").href = "https://www.bynder.com/en/bynder-spotlight-awards/judges-area/#nominees"),
      (document.getElementById("bsa-navcrumb").href = "https://www.bynder.com/en/bynder-spotlight-awards/judges-area/"),
      history.pushState({}, null, window.location.href.replace(window.location.hash, ""))),
  $(document).scroll(function () {
      var t = $(document).scrollTop(),
          o = $(".features-index-sticky");
      t >= $(".features-index-header").outerHeight(!0) - 170 ? o.css({ position: "sticky", top: "144px" }) : o.css({ position: "relative", top: "0px" });
  }),
  $(document).scroll(function () {
      if ($(".homepage-scroll-image").length) {
          var t = document.querySelector(".homepage-scroll-image"),
              o = window.innerWidth;
          window.addEventListener("scroll", function () {
              var e = window.scrollY;
              (t.style.transform = "translate(0px, 0px)"), o < 992 && e > 104 ? (t.style.transform = "translate(0px," + -(e - 104) / 4 + "px)") : o > 991 && (t.style.transform = "translate(0px," + -e / 4 + "px)");
          }),
              window.addEventListener("resize", function () {
                  o = window.innerWidth;
              });
      }
  });
var cardSlide = $(".cards-slide-row"),
  cardSlideRowWidth = $(".cards-slide-container").innerWidth(),
  cardWidth = $(".cards-slide-col").outerWidth();
function checkCardSlidePosition() {
  var t = $(cardSlide).scrollLeft(),
      o = $(".cards-slide-row").width(),
      e = $(".cards-slide-container").width(),
      n = Math.round(e - o);
  o == e
      ? ($(".cards-slide-arrow.left").css("color", "#E6E9EB"), $(".cards-slide-arrow.right").css("color", "#E6E9EB"))
      : t <= 0
      ? ($(".cards-slide-arrow.left").css("color", "#E6E9EB"), $(".cards-slide-arrow.right").css("color", "#B3BDC2"))
      : t >= n
      ? ($(".cards-slide-arrow.left").css("color", "#B3BDC2"), $(".cards-slide-arrow.right").css("color", "#E6E9EB"))
      : ($(".cards-slide-arrow.left").css("color", "#B3BDC2"), $(".cards-slide-arrow.right").css("color", "#B3BDC2"));
}
$(".cards-slide-arrow.right").click(function () {
  $(cardSlide).animate({ scrollLeft: "+=" + cardWidth }, 250), checkCardSlidePosition();
}),
  $(".cards-slide-arrow.left").click(function () {
      $(cardSlide).animate({ scrollLeft: "-=" + cardWidth }, 250), checkCardSlidePosition();
  }),
  $(cardSlide).scroll(function () {
      checkCardSlidePosition();
  }),
  checkCardSlidePosition();
$(document).ready(function () {
  var n = 0,
      t = $(".tab-carousel-progress-bar"),
      o = $("#tabImageCarousel"),
      r = $("#tabImageDescrCarousel");
  function e() {
      t.css({ width: n + "%" }), (n += 0.5) > 100 && ((n = 0), o.carousel("next"), r.carousel("next"));
  }
  $(o, r)
      .carousel({ interval: !1, pause: !0 })
      .on("slid.bs.carousel", function () {});
  var a = setInterval(e, 30);
  $(".tab-carousel-inner img").on(
      "hover",
      function () {
          clearInterval(a);
      },
      function () {
          a = setInterval(e, 30);
      }
  ),
      $(".carousel-control-prev").on("click", function () {
          (n = 0), o.carousel("prev"), r.carousel("prev");
      }),
      $(".carousel-control-next").on("click", function () {
          (n = 0), o.carousel("next"), r.carousel("next");
      }),
      $("#products-carousel .btn-text").on("click", function () {
          var n = $(this).attr("href");
          "_blank" == $(this).attr("target") ? window.open(n, "_blank") : (window.location.href = n);
      }),
      $("#products-carousel .btn-dark").on("click", function () {
          var n = $(this).attr("href");
          "_blank" == $(this).attr("target") ? window.open(n, "_blank") : (window.location.href = n);
      });
});
!(function () {
  if (
      ($('[data-target="#videomodal23"]').each(function () {
          var a = $(this);
          a.on("click", function () {
              var e = $("html").attr("lang"),
                  o = "en_US",
                  d = a.data("video-fid"),
                  l = a.data("video-token"),
                  t = a.data("video-playertype"),
                  i = "v",
                  r = "https://video.bynder.com/";
              "undefined" != t &&
                  ("private" == t ? (i = "49598843") : "withsubtitles" == t ? ((i = "65500579"), "de" == e ? (o = "de_DE") : "fr" == e ? (o = "fr_FR") : "nl" == e && (o = "nl_NL")) : "onbrand" == t && (r = "https://video.onbrand.me/"));
              var s =
                  '<div class="modal modal-lg fade in" style="display:block" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content vimeo"><div class="modal-header"><span class="close close23 display-block pull-right textColor-silver" data-dismiss="modal" aria-label="Close"><i class="icon-close"></i></span></div><div class="modal-body" id="videomodalbody"><div class="video-holder"><div class="embed-container"><div style="width:100%; height:0;"><iframe src="' +
                  (r + i + ".ihtml/player.html?token=" + l + "&source=embed&photo%5fid=" + d + "&autoPlay=1&mutedAutoPlay=1&defaultLocale=" + o) +
                  '" style="width:100%; height:100%; position: absolute; top: 0; left: 0;" width="100%" height="100%" frameborder="0" border="0" scrolling="no" allowfullscreen="1" mozallowfullscreen="1" webkitallowfullscreen="1" allow="autoplay; fullscreen"></iframe></div></div></div></div>';
              (s += "</div></div></div>"),
                  $("body").append(s),
                  $("body").append('<div class="modal-backdrop fade in"></div>'),
                  $("body").addClass("modal-open"),
                  $(".close23").click(function () {
                      $(".modal").remove(), $(".modal-backdrop").remove(), $("body").removeClass("modal-open");
                  });
          });
      }),
      $(document).ready(function () {
          window.location.hash &&
              $('[data-target="#videomodal23"]').each(function () {
                  $(this).attr("href") == window.location.hash && $(this).click();
              });
      }),
      $("#video-toc").length > 0)
  ) {
      var a = $(".video-frame").attr("src");
      var e = new URLSearchParams(window.location.search).get("start");
      null != e && ($(".video-frame").removeAttr("srcdoc"), $(".video-frame").attr("src", a.replace(".html?", ".html?autoPlay=1&start=" + e + "&"))),
          $("#video-toc span").on("click", function () {
              var e = $(this).data("secs");
              $(".video-frame").removeAttr("srcdoc"), $(".video-frame").attr("src", a.replace(".html?", ".html?autoPlay=1&start=" + e + "&"));
          });
  }
})();
function scrollWithOffsetFaster(s, o) {
  null != $(s).offset() && $("html, body").animate({ scrollTop: $(s).offset().top - o }, 200);
}
$(window).scroll(function () {
  if ($(".sticky-spyscroll-section").length && $(".sticky-spyscroll").length) {
      var s = $(window).scrollTop(),
          o = $(".sticky-spyscroll-section").offset().top,
          a = ($(".sticky-spyscroll").offset().top, o - s),
          r = $("header.site-header").outerHeight(),
          t = $(".sticky-spyscroll"),
          c = $("#subnav-spy .linear-links .nav-item:first-child .nav-link");
      a <= r
          ? (t.css({position: "fixed",  boxShadow: "0px 2px 4px -1px rgba(0, 34, 51, 0.10), 0px 1px 1px 0px rgba(0, 34, 51, 0.01)", }),
            $(".sticky-spyscroll.dark-mode .spy-arrow-prev").css("box-shadow", "20px 0 20px 4px #002233, inset 0 -1px 0 0 #193847"),
            $(".sticky-spyscroll.dark-mode .spy-arrow-next").css("box-shadow", "-20px 0 20px 4px #002233, inset 0 -1px 0 0 #193847"),
            $(t).hasClass("dark-mode"))
          : (t.css({ boxShadow: "none", position: "static" }),
            $(".sticky-spyscroll.dark-mode .spy-arrow-prev").css("box-shadow", "20px 0 20px 4px #002233"),
            $(".sticky-spyscroll.dark-mode .spy-arrow-next").css("box-shadow", "-20px 0 20px 4px #002233"),
            $(t).hasClass("dark-mode")),
          a > r && $(c).addClass("active");
          
  }
}),
  $(".scrolltosection").length &&
      $(".scrolltosection").on("click", function (s) {
          var o = $("header.site-header").outerHeight();
          s.preventDefault();
          var a = this.hash;
          scrollWithOffset(a, o);
      }),
  $(".scrolltosecsubs").length &&
      $(".scrolltosecsubs").on("click", function (s) {
          var o = $("header.site-header").outerHeight() + $("#subnav-spy").outerHeight() + 40;
          s.preventDefault();
          var a = this.hash;
          scrollWithOffset(a, o);
      }),
  $(".scrolltosectiontop").length &&
      $(".scrolltosectiontop").on("click", function (s) {
          var o = $("header.site-header").outerHeight();
          s.preventDefault(), scrollWithOffsetFaster(this.hash, o);
      });
var spyScroll = $("#subnav-spy"),
  spyListScroll = $("#subnav-spy ul"),
  spyListScrollWidth = $("#subnav-spy ul").innerWidth(),
  blockwidth = spyListScrollWidth / 5;
function checkSpyScrollPosition() {
  var s = $(spyScroll).scrollLeft(),
      o = $("#subnav-spy").width(),
      a = $("#subnav-spy ul").width();
  if ($(window).outerWidth() > 991) var r = Math.round(a - o);
  else r = Math.round(a - o - 24);
  o == a
      ? ($(".spy-arrow-prev").hide(), $(".spy-arrow-next").hide())
      : s <= 0
      ? ($(".spy-arrow-prev").hide(), $(".spy-arrow-next").show())
      : s >= r
      ? ($(".spy-arrow-prev").show(), $(".spy-arrow-next").hide())
      : ($(".spy-arrow-prev").show(), $(".spy-arrow-next").show());
}
$(".spy-arrow-next").click(function () {
  $(spyScroll).animate({ scrollLeft: "+=" + blockwidth }, 250), checkSpyScrollPosition(), $("#subnav-spy").css("overflow-x", "scroll");
}),
  $(".spy-arrow-prev").click(function () {
      $(spyScroll).animate({ scrollLeft: "-=" + blockwidth }, 250), checkSpyScrollPosition(), $("#subnav-spy").css("overflow-x", "scroll");
  }),
  $(function () {
      $("#subnav-spy ul li a").click(function () {
          checkSpyScrollPosition(), $(this).parent().hasClass("show") ? $("#subnav-spy").css("overflow-x", "scroll") : $("#subnav-spy").css("overflow-x", "hidden");
      });
  }),
  $(spyScroll).scroll(function () {
      checkSpyScrollPosition();
  }),
  $(window).scroll(function () {
      checkSpyScrollPosition();
  }),
  $(window).resize(function () {
      checkSpyScrollPosition();
  }),
  checkSpyScrollPosition();
var previousScroll = 0;
$(window).on("activate.bs.scrollspy", function () {
  var s = $(this).scrollTop(),
      o = $(".scrolltosection.active").innerWidth(),
      a = $(".scrolltosection.active").parent(),
      r = $(a).prev(),
      t = $(r).innerWidth(),
      c = $(a).next();
  $(c).innerWidth();
  s > previousScroll
      ? $(".linear-links .nav-item:first-child a").hasClass("active") || $(spyScroll).animate({ scrollLeft: "+=" + t }, 250)
      : $(".linear-links .nav-item:last-child a").hasClass("active") || $(spyScroll).animate({ scrollLeft: "-=" + o }, 250),
      (previousScroll = s);
});
var url_string = window.location.href,
  url = new URL(url_string),
  vsrc = url.searchParams.get("utm_source"),
  vcam = url.searchParams.get("utm_campaign"),
  vmed = url.searchParams.get("utm_medium");
null != vsrc && null != vcam && "event" == vsrc && "gartner-xpo-2023" == vcam && ($(".gartnerworkshops").removeClass("hidden"), $(".hideongartner").addClass("hidden"));


