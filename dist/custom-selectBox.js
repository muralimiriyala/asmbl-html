jQuery(function () {
  //
  function initSelectBox() {
    jQuery('select').selectBox({
      keepInViewport: false,
      menuSpeed: 'normal',
      mobile: true,
      hideOnWindowScroll: true,
      menuTransition: 'slide',
    })
    jQuery('.selectBox, .selectBox-dropdown .selectBox-label').removeAttr(
      'style',
    )
  }
  initSelectBox()
  const observer = new MutationObserver(function (mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        initSelectBox()
      }
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })
})
