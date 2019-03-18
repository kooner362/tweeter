$(document).ready(function() {
  // --- our code goes here ---
  let char_count = 140;
  $(".new-tweet form textarea").on('keyup', function(event){
    $(".counter").text(char_count - this.value.length);
  });
});
