document.addEventListener("DOMContentLoaded", function (){
   const te = document.querySelector(".get-resource-main");
   const te1 = document.querySelector(".cta-resource-close");
   te.addEventListener("click", function(e){
        e.preventDefault();
        document.querySelector("html").classList.toggle("cta-scroll-hide");
        document.querySelector(".cta-resource-bg").classList.toggle("open");
    });
    te1.addEventListener("click", function(e){
        e.preventDefault();
        document.querySelector("html").classList.remove("cta-scroll-hide");
        document.querySelector(".cta-resource-bg").classList.remove("open");
    });
});