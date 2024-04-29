
document.addEventListener("DOMContentLoaded", function () {
new Splide(".splide", {
    type: "loop",
    drag: "free",
    focus: "left",
    perPage: 6,
    autoScroll: {
        speed: 1.5
    },
    arrows: false,
    pagination: false
    }).mount(window.splide.Extensions);
});
  