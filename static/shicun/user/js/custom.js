$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

jQuery(document).ready(function($){
  var $timeline_block = $('.cd-timeline-block');

  //hide timeline blocks which are outside the viewport
  $timeline_block.each(function(){
    if($(this).offset().top > $(window).scrollTop()+$(window).height()*0) {
      $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
    }
  });

  setTimeout(() => {
    $timeline_block.each(function(){
      // console.log($(this).offset().top <= $(window).scrollTop() + $(window).height()*2)
      if( $(this).offset().top <= $(window).scrollTop() + $(window).height()*0.8 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
        $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
      }
    });
  }, 500);

  //on scolling, show/animate timeline blocks when enter the viewport
  $("#scroll1").on('scroll', function(){
    // console.log(1)
    $timeline_block.each(function(){
      // console.log($(this).offset().top <= $(window).scrollTop() + $(window).height()*2)
      if( $(this).offset().top <= $(window).scrollTop() + $(window).height()*0.8 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
        $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
      }
    });
  });
});

$(".navbar-collapse").css({ maxHeight: $(window).height() - $(".navbar-header").height() + "px" });
