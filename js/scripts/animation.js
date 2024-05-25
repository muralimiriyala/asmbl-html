var $animation_elements = jQuery('[data-animation]');
var $window = jQuery(window);
var $document = jQuery(document);

function check_if_in_view() {
  $animation_elements.each(function() {
    const $self = jQuery(this);
    const animation = $self.data('animation');
    const animateType = $self.data('animate');
    const delay = Number($self.data('animation-delay') || 0);
    const timeline = $self[0].tl
    const counter = $self[0].counter
    if($self.is(':in-viewport', { tolerance: 50 })) {
      setTimeout(() => {
        if (animateType) _.animateRun($self, animateType);
        else $self.addClass('visible ' + animation);
        if (timeline) {
          timeline.play();
        }
      }, delay);
    } else {
      if (timeline && timeline.progress() > 0) {
        timeline.progress(0);
      }
      if (counter) {
        counter.reset();
      }
    }
  });
}
$window.on("load scroll", check_if_in_view);
jQuery(check_if_in_view);