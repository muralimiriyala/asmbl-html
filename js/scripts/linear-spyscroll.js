var $ = jQuery.noConflict();

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
      var a = $(".video-frame").attr("src"),
          e = new URLSearchParams(window.location.search).get("start");
      null != e && ($(".video-frame").removeAttr("srcdoc"), $(".video-frame").attr("src", a.replace(".html?", ".html?autoPlay=1&start=" + e + "&"))),
          $("#video-toc span").on("click", function () {
              var t = $(this).data("secs");
              $(".video-frame").removeAttr("srcdoc"), $(".video-frame").attr("src", a.replace(".html?", ".html?autoPlay=1&start=" + t + "&"));
          });
  }
})();
$("#products-carousel .btn-text, #products-carousel .btn-dark").on("click", function () {
  var t = $(this).attr("href"),
      o = $(this).attr("target");
  "_blank" == o ? window.open(t, "_blank") : (window.location.href = t);
});
var spyScroll = $("#subnav-spy"),
  spyListScroll = $("#subnav-spy ul"),
  blockWidth = spyListScroll.innerWidth() / 5;
function checkSpyScrollPosition() {
  var t = $(spyScroll).scrollLeft(),
      o = Math.round($(spyListScroll).innerWidth() - $(spyScroll).outerWidth(!0));
  t <= 0
      ? $(".scroll-left").addClass("d-none")
      : t >= o
      ? $(".scroll-right").addClass("d-none")
      : (t >= 1 ? $(".scroll-left").removeClass("d-none") : $(".scroll-left").addClass("d-none"), t < o ? $(".scroll-right").removeClass("d-none") : $(".scroll-right").addClass("d-none"));
}
$(".scroll-left").on("click", function (t) {
  $(spyScroll).animate({ scrollLeft: "-=" + blockWidth }, 250), checkSpyScrollPosition();
}),
  $(".scroll-right").on("click", function (t) {
      $(spyScroll).animate({ scrollLeft: "+=" + blockWidth }, 250), checkSpyScrollPosition();
  }),
  $(spyScroll).scroll(function () {
      checkSpyScrollPosition();
  }),
  checkSpyScrollPosition();
$(".subnav-top-link").on("click", function (t) {
  t.preventDefault();
  var o = $(".scrolltoanchor"),
      e = o.attr("href");
  $(e).length && o.trigger("click");
});
