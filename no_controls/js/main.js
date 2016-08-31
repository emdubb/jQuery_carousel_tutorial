$(document).ready(function(){

  // set an interval for the slide to run on
  var interval = window.setInterval(rotateSlides, 3000); // Duration until slide changes (3sec)

  function rotateSlides(){
    // Get the first slide and store it
    var $firstSlide = $('#carousel').find('div:first');

    // Get the width of the slide so we know how much to slide by
    var width = $firstSlide.width();

    // Animate the first slide to move to the left the length of the
    // width. Set 1000 (1sec) to be the length of the slide transition.
    $firstSlide.animate({marginLeft: -width}, 1000, function(){
      // Reorder slides - move the $firstSlide after the last slide
      var $lastSlide = $('#carousel').find('div:last');
      $lastSlide.after($firstSlide);

      // Reset slide position to the end of the queue
      $firstSlide.css({marginLeft: 0});
    });
  }

});
