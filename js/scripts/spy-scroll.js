"use strict";
document.addEventListener("DOMContentLoaded", function(){
    const linearLinks= document.querySelectorAll("ul.linear-links li a");
    let headerHeight = document.querySelector(".site-header").offsetHeight;

    // Function to scroll to the section with the hash
    function scrollToHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const section = document.getElementById(hash);
            if (section) {
                const sectionTop = section.offsetTop - headerHeight;
                window.scrollTo({
                    top: sectionTop,
                    behavior: "smooth"
                });
            }
        }
    }
    setTimeout(scrollToHash, 100);
    
   for(let linearLink of linearLinks){
    linearLink.addEventListener("click", function(e){
        e.preventDefault();
        const currentId = this.getAttribute("href").substring(1);
        const section = document.getElementById(`${currentId}`);
        if (section) {
            const sectionTop = section.offsetTop - headerHeight;
            window.scrollTo({
                top: sectionTop,
                behavior: "smooth"
            });
        }
    });
   }
})