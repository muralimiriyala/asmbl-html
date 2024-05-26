document.addEventListener("DOMContentLoaded", function(){
    const pswitch = document.querySelector(".pricing-switch input");
    const pricingitems = document.querySelectorAll(".pricing-data");
   pricingitems.forEach(function(pricingitem){
        let pricingvalue = pricingitem.getAttribute("data-value");
        pswitch.addEventListener("click", function(){
            if(pswitch.checked){
                if(pricingvalue==="yearly"){
                    pricingitem.style.display = "block";
                }
                else{
                    pricingitem.style.display = "none";
                }
            }
            else{
                if(pricingvalue==="monthly"){
                    pricingitem.style.display = "block";
                }
                else{
                    pricingitem.style.display = "none";
                }
            }
        });
   });

});