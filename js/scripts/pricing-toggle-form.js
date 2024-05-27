document.addEventListener("DOMContentLoaded", function(){
    const pswitch = document.querySelector(".pricing-switch input");
    const pricingitems = document.querySelectorAll(".pricing-data");
   pricingitems.forEach(function(pricingitem){
        let pricingvalue = pricingitem.getAttribute("data-value");
        pswitch.addEventListener("click", function(){
            if(pswitch.checked){
                pricingvalue==="yearly" ? pricingitem.style.display = "block" : pricingitem.style.display = "none";
            }
            else{
                pricingvalue==="monthly" ? pricingitem.style.display = "block" : pricingitem.style.display = "none";
            }
        });
   });
   const mswitch = document.querySelector(".marketing-plan-switch input");
   const marketingitems = document.querySelectorAll(".marketing-plan-data");
   marketingitems.forEach(function(marketingitem){
       let marketingvalue = marketingitem.getAttribute("data-value");
       mswitch.addEventListener("click", function(){
           if(mswitch.checked){
                marketingvalue ==="yearly" ? marketingitem.style.display = "block" : marketingitem.style.display = "none";
           }
           else{
                marketingvalue ==="monthly" ? marketingitem.style.display = "block" : marketingitem.style.display = "none";
           }
       });
  });
});