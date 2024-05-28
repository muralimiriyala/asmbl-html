var DrawSVGPlugin = DrawSVGPlugin || window.DrawSVGPlugin 
var CountUp = CountUp || window.CountUp 

gsap.registerPlugin(DrawSVGPlugin)
function getRandomInt(min, max) { return Math.random() * (max - min) + min; }

// data-animation for left right fades
var gsap_elements = jQuery('[data-animation]');
gsap_elements.each(function () {
    const _gself = jQuery(this);
    const _gclass = _gself.data('animation');
    var tl = gsap.timeline({ paused: true });
    switch (_gclass) {
        case 'gsap-left':
            tl.fromTo(_gself[0], { x: -50, transition: 'none' }, { x: 0, duration: 1.5, ease: 'power1.out' });
            break;
        case 'gsap-right':
            tl.fromTo(_gself[0], { x: 50, transition: 'none' }, { x: 0, duration: 1.5, ease: 'power1.out' });
            break;
        case 'gsap-up':
            tl.fromTo(_gself[0], { y: 25, transition: 'none' }, { y: 0, duration: 1.5, ease: 'power1.out' });
            break;
        case 'gsap-down':
            tl.fromTo(_gself[0], { y: -25, transition: 'none' }, { y: 0, duration: 1.5, ease: 'power1.out' });
            break;
        default: break;
    }
    _gself[0].tl = tl;
});


// Draw Line Chart 
// var $footer = jQuery('.footer-svg svg');
// $footer.each(function(){
//   var $self = jQuery(this);
//   var $rect = $self.find('rect');
//   var tl = gsap.timeline({ repeat: -1, repeatDelay: 4 });
//   $rect.each(function(index, element){
//     var $width = jQuery(element).attr("width");
//     var $height = jQuery(element).attr("height");
    
//     if (index === 1 || index === 4 || index == 7) {
//       tl.fromTo(element, { attr: { width: $width, height: $height } }, { attr: { width: 20, height: 20}, duration: 2, ease: 'expo.inOut' })
//         .to(element, { duration: 1.5, ease: 'power2.out' }, "-=0.75");
//     }
//     tl.fromTo(element, { attr: { width: 0, height: 0 } }, { attr: { width: $width, height: $height }, duration: 1, ease: 'expo.inOut' })
//     .to(element, { duration: 1.5, ease: 'power2.out' }, "-=0.75");
//   });
//   $self[0].tl = tl;
// });

