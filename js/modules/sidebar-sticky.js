document.addEventListener("DOMContentLoaded", function(){
    const header = document.querySelector("header.site-header");
    const hHeight = header.clientHeight;
    const stickySidebar = document.querySelector(".sticky-sidebar");
    const stickySidebartop = document.querySelector(".aside-sticky-sidebar");
    const stickyOffset = stickySidebartop.offsetTop;

    const footer = document.querySelector(".site-footer");
    const footerOffset = footer.offsetTop;
    const sidebarHeight = stickySidebar.offsetHeight;
    const maxY = footerOffset - sidebarHeight - stickyOffset;
    const threshold = stickyOffset - hHeight; // Distance from top to trigger "sticky" behavior

    window.onscroll = function(){
        let scroll = window.scrollY;
        if (scroll >= threshold && scroll <= maxY + threshold) {
            stickySidebar.classList.add("sticky");
            stickySidebar.style.position = 'fixed';
            stickySidebar.style.top = hHeight + 'px'; // Adjusting top position by header height
        } else if (scroll > maxY + threshold) {
            stickySidebar.classList.remove("sticky");
            stickySidebar.style.position = 'absolute';
            stickySidebar.style.top = (footerOffset - (sidebarHeight + stickyOffset)) + 'px'; // Adjusting top position for footer
        } else {
            stickySidebar.classList.remove("sticky");
            stickySidebar.style.position = 'relative';
            stickySidebar.style.top = 'auto';
        }
    }
});
