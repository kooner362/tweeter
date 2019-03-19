$(document).ready(function() {
  // --- our code goes here ---
  let char_count = 140;
  $(".new-tweet form textarea").on('input', function(event){
    var counter = $(this).siblings().find('.counter');
    counter.text(char_count - this.value.length);
    if((char_count - this.value.length) < 0) {
      counter.addClass('over');
    } else {
      counter.removeClass('over');
    }
  });
});
//also add css for color of text and use jquery to add/remove the class
