/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const sampleTweetObjects =  [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

// const sampleTweetObject = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png"
//     ,
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// }


 $(document).ready(function() {

  const createTweetElement = function (tweet) {
   const tweetElement = `<div class='whole-tweet'>
   <article> 
       <div class='user-information'>
         <h3 class='actual-name'>
           <picture>
            <img src=${tweet['user']['avatars']}>
           </picture>
           ${tweet['user']['name']}
         </h3>
         <h3 class='tweeter-handle'>${tweet['user']['handle']}</h3>
       </div>
       <p>${escape(tweet['content']['text'])}</p>
       
       <div class='utility'> 
         <div class='time'>${theTimeIs()}</div>
         <div class='misc-buttons'>
           <button>Retweet</button> 
           <button>Save</button> 
           <button>Report</button> 
         
         </div>

       </div>

   </article>
 </div>`

 //$(".tweet-holder").append(tweetElement);
 $(".tweet-holder").prepend(tweetElement);
  }

    // renderTweets loops through an array of objects, using createTweetElement to append data to the site.
  const renderTweets = function (tweets) {
      for(let tweet of tweets) {
        createTweetElement(tweet);
    }
  }
  //renderTweets(sampleTweetObjects);
  

  //creating an ajax post request to work with the tweet button.
  //   $( "#new-tweet-form" ).submit(function( event ) {
  //   //alert( "Handler for .submit() called." );
  //   event.preventDefault();
  //   $.ajax('/tweets', {method:'POST', data: $( this ).serialize() })
  // });

  // checking text area before submission
    //creating an ajax post request to work with the tweet button.
    
    
      
     $( "#new-tweet-form" ).submit(function( event ) {

        event.preventDefault();
        let charactersT = $('#tweet-text').val();
        console.log(charactersT);
         if (charactersT.length === 0) {
          //alert( "you can't enter blank tweet" );
         // $('#error-message').css('opacity','1');
          $('#error-message1').slideDown(1000);
         } else if (charactersT.length > 140) {
          //alert( "you've exceed 140 characters" );
          //$('#error-message').css('opacity','1').slideDown(5000);
          $('#error-message2').slideDown(1000);
          
         } else {   
          $.ajax('/tweets', {method:'POST', data: $( this ).serialize() });
          
          
          
          $('#error-message1').slideUp(1000);
          $('#error-message2').slideUp(1000);
          setTimeout(() => {location.reload()}, 1001);
        };
      
    });











  //loadTweets; a fcn responsible for fetching tweets from the /tweets page.
  const loadTweets = function () {
   return $.ajax('/tweets',{method: 'GET', data: $( this ).serialize() }).then(function (tweetResponse) {
      renderTweets(tweetResponse);
    })
    
  };
  
  loadTweets().then();
  //renderTweets(loadTweets);
 });
  

// XSS prevention
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};



// getting time in a readable way
const theTimeIs = function(){
let date = new Date();
let minutes = date.getMinutes();
let hour = date.getHours();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
return `${hour}:${minutes} ${day}-${month + 1} -${year}`;
}
// tweet['created_at'] this works