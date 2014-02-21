$(document).ready(function() {
  var throttleDelay = 66;
  var behindDiagramExtraHeight = 60;
  var delayEachChoiceFor = 400; // ms
  var fadeInChoicesFor = 300; // ms

  var allDiagrams = $('.diagram_middle');
  var allTextSizeLinks = $('.text_sizes a');
  var choices = $('.choice');
  var choiceLinks = $('.choice a');
  var diagramBoxes = $('.diagram_box');
  var sliders = $('.flexslider, .flexslider2, .flexslider3, .flexslider4');
  var homeLink = $('header nav a.nav_page_1');
  var navPage1 = $('.nav_page_1');
  var navPage2 = $('.nav_page_2');
  var outer = $('#outer');
  var sliderNavLinks = $('a.slider_nav');

  var initSlider = function(slider, selector, animation) {
    animation = animation || 'fade';

    $(slider).flexslider({
      animation: animation,
      selector: selector,
      touch: false,
      controlNav: false,
      animationLoop: false,
      directionNav: false,
      slideshow: false,
      smoothHeight: true
    });
  };

  var openSlider = function(whichSlider, whichIndex) {
    $(sliders[0]).flexslider(whichIndex);
    $(sliders[whichSlider - 1]).flexslider(0);
    $('a.slider_nav_' + whichSlider)
      .removeClass('slider_active')
      .first().addClass('slider_active');
    $(sliders[whichSlider - 1]).show();
  };

  var moveSlider = function(whichSlider, whichIndex) {
    $(sliders[whichSlider - 1]).flexslider(whichIndex);
    $('a.slider_nav').removeClass('slider_active');
  };

  var makeSlidePageActive = function(link) {
    link.addClass('slider_active');
  };

  var applyNewTextSize = function(newSize) {
    outer
      .removeClass('text_small text_medium text_large')
      .addClass('text_' + newSize);
  };

  var makeSizeLinkActive = function(activatedLink) {
    allTextSizeLinks.removeClass('text_size_active');
    activatedLink.addClass('text_size_active');
  };

  var goToHomePage = function() {
    navPage1.addClass('nav_active');
    navPage2.removeClass('nav_active');
  };

  var goToAdvicePage = function() {
    navPage1.removeClass('nav_active');
    navPage2.addClass('nav_active');
  };

  var resetSlider = function() {
    $(sliders[0]).flexslider(0);
    hideSlidersBut(0);
  };

  var hideSlidersBut = function(idx) {
    sliders.each(function(index) {
      if (index !== idx)
        $(sliders[index]).hide();
    });
  };

  var showChoices = function() {
    choices.each(function(index) {
      $(this)
        .delay(delayEachChoiceFor * index)
        .fadeIn(fadeInChoicesFor);
    });
  };

  var updateDiagrams = function() {
    var documentWidth = $(document).width();

    allDiagrams.each(function() {
      var maxHeight = 0;
      var self = $(this);

      if (documentWidth < 400) {
        diagramBoxes
          .removeClass('autoHeight')
          .addClass('minAutoHeight');
      } else {
        diagramBoxes.each(function() {
          diagramBoxes
            .removeClass('minAutoHeight')
            .addClass('autoHeight');

          var height = $(this).height();
          if (height > maxHeight)
            maxHeight = height;
        });
        diagramBoxes.css({ 'min-height': maxHeight });
        self.find('.diagram_behind').height(maxHeight + behindDiagramExtraHeight);
      }
    });
  };

  var setUpResize = function() {
    var resizeTimeout;
    var throttledResize = function() {
      resizeTimeout = null;
      updateDiagrams();
    };
    $(window).resize(function() {
      if (!resizeTimeout)
        resizeTimeout = setTimeout(throttledResize, throttleDelay);
    });
  };

  var textResizeAction = function(e) {
    e.preventDefault();

    var self = $(this);
    var size = self.data('size');

    applyNewTextSize(size);
    makeSizeLinkActive(self);
    updateDiagrams();
  };

  var goHomeAction = function(e) {
    e.preventDefault();

    goToHomePage();
    resetSlider();
  };

  var choiceAction = function(e) {
    e.preventDefault();

    var self = $(this);
    var whichSlider = self.data('which-slider');
    var whichIndex = self.data('which-index');
    var whichSlides = self.data('which-slides');

    initSlider(sliders[whichSlider - 1], '.slides' + whichSlides + ' > li', 'slide');
    goToAdvicePage();
    updateDiagrams();
    openSlider(whichSlider, whichIndex);
  };

  var slideNavAction = function(e) {
    e.preventDefault();

    var self = $(this);
    var whichSlider = self.data('which-slider');
    var whichIndex = self.data('which-index');

    moveSlider(whichSlider, whichIndex);
    makeSlidePageActive(self);
  };

  allTextSizeLinks.on('click', textResizeAction);
  choiceLinks.on('click', choiceAction);
  homeLink.on('click', goHomeAction);
  sliderNavLinks.on('click', slideNavAction);

  showChoices();
  hideSlidersBut(0);
  initSlider(sliders[0], '.slides > li');
  setUpResize();
});
