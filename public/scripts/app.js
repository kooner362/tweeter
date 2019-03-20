/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function() {
   let slide = true;
   $("#compose").on('click', function() {
     let container = $('.new-tweet');
     if (slide) {
       container.slideUp();
       slide = false;
     } else {
       container.slideDown();
       $('.new-tweet form textarea').focus();
       slide = true;
     }
     return false;
    });

   $(".new-tweet form").on('submit', function(event){
     event.preventDefault();
     let data = $(this).serialize();
     let textarea = $(this).find('textarea');
     let message_len = textarea.val().length;
     if (message_len >= 140) {
       alert('Your tweet is too long!');
     } else if (message_len == 0) {
       alert('Your tweet is empty!');
     } else {
       $.ajax({
        type: "POST",
        url: "/tweets",
        data: data,
        dataType: "text",
        success: function(resultData){
            renderTweets([JSON.parse(resultData)]);
            textarea.val('');
            $(textarea).siblings().find('.counter').text('140');
         }
       });
     }
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
     let article = $("<article></article").addClass('tweet');

     let header = $("<header></header");
     header.append($(`<img src="${tweetData.user.avatars.small}">`));
     header.append($(`<h2>${tweetData.user.name}</h2>`));
     header.append($(`<p>${tweetData.user.handle}</p>`));
     article.append(header);
     let text = $("<p></p>").text(`${tweetData.content.text}`);
     article.append(text);

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
       $('.tweets').prepend($tweet);
     })
   }

   loadTweets();
 });
