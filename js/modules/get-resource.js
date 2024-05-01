document.addEventListener("DOMContentLoaded", function (){
   const _ctabtn = document.querySelector(".get-resource-main");
   const _ctacolse = document.querySelector(".cta-resource-close");
   _ctabtn.addEventListener("click", function(e){
        e.preventDefault();
        document.querySelector("html").classList.toggle("cta-scroll-hide");
        document.querySelector(".cta-resource-bg").classList.toggle("open");
    });
    _ctacolse.addEventListener("click", function(e){
        e.preventDefault();
        document.querySelector("html").classList.remove("cta-scroll-hide");
        document.querySelector(".cta-resource-bg").classList.remove("open");
    });
});