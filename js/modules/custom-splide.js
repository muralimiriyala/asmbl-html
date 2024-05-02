document.addEventListener("DOMContentLoaded", function () {
    const test = document.querySelector(".splide");
    console.log("1234", test)
    if(test !== null){ 
        new Splide(test, {
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
    }
});
