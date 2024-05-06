document.addEventListener("DOMContentLoaded", function(){
    const mysplide = document.querySelector(".splide");
    if(mysplide !== null){ 
        new Splide(mysplide, {
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
