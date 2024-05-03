
jQuery(document).ready(function($){
    $("ul.who-for-tabs li:first a").addClass("active");
    const _selflink = $("ul.who-for-tabs li a");
    _selflink.on("click", function(e){
        e.preventDefault();
        _selflink.not(this).removeClass("active");
        $(this).addClass("active");
        let attr = $(this).attr("data-name");
        console.log(attr)
        $(".who-for-page").hide();
        $(".who-for-page[data-value = "+ attr +" ]").fadeIn();
    })

});