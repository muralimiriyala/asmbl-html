var DrawSVGPlugin = DrawSVGPlugin || window.DrawSVGPlugin 
var CountUp = CountUp || window.CountUp 

gsap.registerPlugin(DrawSVGPlugin)

function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}

// Oval Chart
var $ovalChart = jQuery('.ui-oval-chart');
$ovalChart.each(function () {
  var $self = jQuery(this)
  var $chart = $self.find('[data-ui-el="chart"]')
  var $label = $self.find('[data-ui-el="label"]')
  var $value = $self.find('[data-ui-el="value"]')
  var $counter = $self.find('[data-ui-el="counter"]')
  var $progress = $self.find('[data-ui-el="progress"]')
  var value = Number($self.find('[data-value]').data('value'))
  var counterRef = new CountUp($counter[0], value)

  var tl = gsap.timeline({
    paused: true
  })

  tl.fromTo($self[0], { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'back.inOut'})
  tl.fromTo($chart[0], { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.75, ease: 'back.out'}, '>-0.25')
  tl.fromTo($value[0], { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.75, ease: 'back.out'}, '<')
  tl.fromTo($label[0], { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'back.out'}, '<')
  tl.fromTo($progress[0], { drawSVG: '0%' }, { drawSVG: value + '%', duration: 2, ease: 'power2.out', onStart: function () { counterRef.start() }}, '<')

  $self[0].tl = tl
  $self[0].counter = counterRef
})

// Line Chart 
var $lineChart = jQuery('.ui-line-chart')

$lineChart.each(function () {
  var $self = jQuery(this)
  var $chart = $self.find('[data-ui-el="chart"]')
  var $lines = $self.find('[data-ui-el="lines"]')
  var $progress = $self.find('[data-ui-el="progress"]')
  var $dots = $self.find('[data-ui-el="dot"]')
  var $label = $self.find('[data-ui-el="label"]')

  var tl = gsap.timeline({
    paused: true
  })

  tl.fromTo($self[0], { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'back.inOut'})
  tl.fromTo($lines[0], {  scaleY: 0, transformOrigin: '50% 0%' }, { scaleY: 1, duration: 0.75, ease: 'power1.out'},  '>-0.25')
  tl.fromTo($label[0], { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'back.out'}, '<')
  tl.fromTo($dots[0], { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.5, ease: 'power2.out'}, '>-0.25')
  tl.fromTo($progress[0], { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.5, ease: 'power1.out'})
  tl.fromTo($dots[1], { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.5, ease: 'power2.out'})

  $self[0].tl = tl
})


// Bar Chart 
var $barChart = jQuery('.ui-bar-chart')

$barChart.each(function () {
  var $self = jQuery(this)
  var $chart = $self.find('[data-ui-el="chart"]')
  var $bars = $self.find('[data-ui-el="bar"]')
  var $label = $self.find('[data-ui-el="label"]')


  var tl = gsap.timeline({
    paused: true
  })

  tl.fromTo($self[0], { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'back.inOut'})
  tl.fromTo($chart[0], {  opacity: 0 }, { opacity: 1, duration: 0.75, ease: 'power1.out'},  '>-0.25')
  tl.fromTo($label[0], { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'back.out'}, '<')

  setInterval(function () {
    for (let i = 0; i < $bars.length; i++) {

      gsap.to($bars[i], { scaleY: getRandomInt(20, 100) / 100, duration: 0.5, ease: 'power1.out' })
    }
  }, 1500)

  $self[0].tl = tl
})

// Timeline
var $timeline = jQuery('.ui-timeline')

$timeline.each(function () {
  var $self = jQuery(this)
  var $level = $self.find('.t-level')
  var $line = $self.find('.t-svg path')


  var tl = gsap.timeline({
    paused: true
  })

  tl.fromTo($self[0], { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'back.inOut'}, 'start')
  $level.each(function (index) {
    var $circle = jQuery(this).find('.t-circle circle')
    tl.fromTo(jQuery(this)[0], { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'back.out'}, '>')
    tl.fromTo($circle[0], { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.6, ease: 'back.out'}, '<')
  })
  $line.each(function (index) {
    tl.fromTo(jQuery(this)[0], { drawSVG: '0%' }, { drawSVG: '100%', duration: 4, ease: 'none'}, 'start')
  })

  $self[0].tl = tl
})

// Bar Chart 
var $drawing = jQuery('.ui-drawing')
$drawing.each(function () {
  var $self = jQuery(this)
  var $path = $self.find('path');

  var tl = gsap.timeline({
    paused: true
  })

  tl.fromTo($path[0], { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.5, ease: 'power1.out'})

  $self[0].tl = tl
})



// Draw Line Chart 
var $drawingLine = jQuery('.ui-draw-line')

$drawingLine.each(function () {
  var $self = jQuery(this)
  var $path = $self.find('path')

  var tl = gsap.timeline({
    paused: true
  })

  tl.fromTo($path[0], { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.5, ease: 'power1.out'})
  tl.fromTo($path[1], { drawSVG: '0%' }, { drawSVG: '100%', duration: 2, ease: 'power1.out'})

  $self[0].tl = tl
})


// Circle Chart 
var $circleLine = jQuery('.ui-circle-line')
$circleLine.each(function () {
  var $self = jQuery(this)
  var $path = $self.find('.b-zoom-in')

  var tl = gsap.timeline({
    paused: true
  })

  tl.fromTo($path[0], { scale: '0.5', opacity: '0', rotate: '0deg', transformOrigin:"center center" }, { rotate: '360deg', scale: '1', opacity: '1', duration: 3.5, ease: 'power1.out'})
  $self[0].tl = tl
})

// our team page line animation
var $teamVector = jQuery(".ui-team-vector");
$teamVector.each(function(){
  var $self = jQuery(this);
  var $line = $self.find('svg path');
  var tl = gsap.timeline({
    paused: true
  })

  tl.fromTo($self[0], { opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'back.inOut'}, 'start')
  $line.each(function (index) {
    var pathLength = jQuery(this)[0].getTotalLength();
    tl.fromTo(
      jQuery(this)[0],
      { strokeDashoffset: pathLength / 8, strokeDasharray: "4, " + 4 },
      { strokeDashoffset: 0, duration: 4, ease: 'power1.out' },
      'start'
    );
  });
  $self[0].tl = tl;
});

// Location page line animation
var directionsChart = jQuery(".directions-chart");
directionsChart.each(function(){
  const $self = jQuery(this);
  const $path = $self.find("svg path");
  var tl = gsap.timeline({
    paused: true
  })
  tl.fromTo($self[0], { opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'back.inOut'}, 'start')
  $path.each(function (index) {
    var pathLength = jQuery(this)[0].getTotalLength();
    tl.fromTo(
      jQuery(this)[0],
      { strokeDashoffset: pathLength / 8, strokeDasharray: "3, " + 3 },
      { strokeDashoffset: 0, duration: 4, ease: 'power1.out' },
      'start'
    );
  });
  $self[0].tl = tl;

})










