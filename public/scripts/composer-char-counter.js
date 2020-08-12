$(document).ready(function() {
  // --- our code goes here ---
  console.log('hello testings the jquery stuff')
  // the following prints the contents of the textbox after every keydown event
  //$( "#tweet-text" ).keydown(function () {console.log(this.value)});
  
  //working
  $( "#tweet-text" ).keyup(function () {
    let charCount =  140 - $(this).val().length;
    $('#charCounter').text(charCount);
    console.log(charCount)

    if (charCount < 0) {
      $('#charCounter').css('color','red');
    } else {
      $('#charCounter').css('color','blue');
    }

  });
  //let charCount = $( "#tweet-text" ).keypress(function () {this.value.length+1});
  //$('#charCount').val(charCount);
 // document.getElementById('tweet-text').value = charCount;



});

