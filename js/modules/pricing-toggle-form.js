document.addEventListener("DOMContentLoaded", function(){
    const pswitch = document.querySelector(".pricing-switch input");
    const pricingitems = document.querySelectorAll(".pricing-data");
   pricingitems.forEach(function(pricingitem){
        let pricingvalue = pricingitem.getAttribute("data-value");
        pswitch.addEventListener("click", function(){
            if(pswitch.checked){
                console.log("checked");
                if(pricingvalue==="yearly"){
                    pricingitem.style.display = "block";
                }
                else{
                    pricingitem.style.display = "none";
                }
            }
            else{
                console.log("not checked");
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