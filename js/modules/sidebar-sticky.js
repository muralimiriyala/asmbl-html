
// document.addEventListener("DOMContentLoaded", function(){
//     const header = document.querySelector("header.site-header");
//     const hHeight = header.clientHeight;
//     const stickySidebar = document.querySelector(".sticky-sidebar");
//     const stickySidebartop = document.querySelector(".sticky-sidebar-top");
//     const stickyOffset = stickySidebartop.offsetTop;
//     const stickyRemove = document.querySelector(".sticky-content");
//     const stickyHeight = stickyRemove.clientHeight;    
//     window.onscroll = function(){
//         let scroll = window.scrollY;
//         console.log(scroll, stickyOffset)
//         if (scroll >= hHeight && scroll <= stickyHeight + stickyOffset - stickySidebar.clientHeight) {
//             stickySidebar.classList.add("sticky");
//         } else {
//             stickySidebar.classList.remove("sticky");
//         }
//     }
// });




document.addEventListener("DOMContentLoaded", function(){
    const header = document.querySelector("header.site-header");
    const hHeight = header.clientHeight;
    const stickySidebar = document.querySelector(".sticky-sidebar");
    const stickySidebartop = document.querySelector(".sticky-sidebar-top");
    const stickyOffset = stickySidebartop.offsetTop;
    const stickyRemove = document.querySelector(".sticky-content");
    const stickyHeight = stickyRemove.clientHeight;
    
    const footerOffset = document.querySelector(".site-footer").offsetTop;
    const sidebarHeight = stickySidebar.offsetHeight;
    const maxY = footerOffset - sidebarHeight - stickyOffset;

    window.onscroll = function(){
        let scroll = window.scrollY;

        if (scroll > stickyOffset) {
            if (scroll < maxY) {
                stickySidebar.classList.add("sticky");
                stickySidebar.style.position = 'fixed';
                stickySidebar.style.top = '0';
            } else {
                stickySidebar.classList.remove("sticky");
                stickySidebar.style.position = 'absolute';
                stickySidebar.style.top = (maxY - stickyOffset) + 'px';
            }
        } else {
            stickySidebar.classList.remove("sticky");
            stickySidebar.style.position = 'relative';
            stickySidebar.style.top = 'auto';
        }
    }
});
