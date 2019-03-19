/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function() {

   $(".new-tweet form").on('submit', function(event){
     event.preventDefault();
     let data = $(this).serialize();
     $.ajax({
      type: "POST",
      url: "/tweets",
      data: data,
      dataType: "text",
      success: function(resultData){
          console.log('Done!');
      }
      });
    });

   function loadTweets () {
     $.ajax('/tweets', { method: 'GET' })
     .then(function (data) {
       renderTweets(data);
    });
   }

   function getDays (tweetDate) {
     let day = 86400000;
     let today = new Date().getTime();
     let days = Math.floor((today - tweetDate) / day);
     return days;
   }

   function createTweetElement (tweetData) {
     let article = $("<article class='tweet'></article");

     let header = $("<header></header");
     header.append($(`<img src="${tweetData.user.avatars.small}">`));
     header.append($(`<h2>${tweetData.user.name}</h2>`));
     header.append($(`<p>${tweetData.user.handle}</p>`));
     article.append(header);

     article.append(`<p>${tweetData.content.text}</p>`);

     let footer = $("<footer></footer>");
     footer.append(`<span class="age">${getDays(tweetData.created_at)} days ago</span>`);
     let footer_div = $("<div></div>");
     footer_div.append('<i class="fas fa-flag"></i>');
     footer_div.append('<i class="fas fa-retweet"></i>');
     footer_div.append('<i class="fas fa-heart"></i>');
     footer.append(footer_div);
     article.append(footer);
     return article;
   }

   function renderTweets (tweetData) {
     tweetData.forEach(function(user) {
       let $tweet = createTweetElement(user);
       $('.tweets').append($tweet);
     })
   }

   loadTweets();
 });
