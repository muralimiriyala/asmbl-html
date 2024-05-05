document.addEventListener("DOMContentLoaded", function(){
    const test = document.querySelector(".splide");
    if(test !== null){ 
        new Splide(test, {
            type: "loop",
            drag: "free",
            focus: "left",
            perPage: 6,
            fixedWidth: "256px",
            autoScroll: {
                speed: 1.5
            },
            arrows: false,
            pagination: false
        }).mount(window.splide.Extensions);
    }
});
