$(document).ready(function() {
  // --- our code goes here ---



console.log('testing the composer counter js file')

$('#tweet-text').on("input", function(){
  var maxlength = $(this).attr("maxlength");
  var currentLength = $(this).val().length;

  if( currentLength >= maxlength ){
      console.log("You have reached the maximum number of characters.");
  }else{
      console.log(maxlength - currentLength + " chars left");
  }
});






});