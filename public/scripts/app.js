/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function() {
   let slide = true;
   let error_messages = $('#errors');
   $('.new-tweet').hide();
   $('#errors').hide();

   $("#compose").on('click', function() {
     let container = $('.new-tweet');
     container.slideToggle();
     $(".new-tweet form textarea").focus();
     return false;
    });

   $(".new-tweet form").on('submit', function(event){
     event.preventDefault();
     error_messages.hide();
     let data = $(this).serialize();
     let textarea = $(this).find('textarea');
     let message_len = textarea.val().length;
     if (message_len >= 140) {
       text('Your message is too long!');
       error_messages.slideDown();
     } else if (message_len === 0) {
       error_messages.text('Your tweet is empty!');
       error_messages.slideDown();
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
     let hour_in_ms = 86400000 / 24;
     let mins_in_ms = hour_in_ms / 60;
     let secs_in_ms = mins_in_ms / 60;
     let today = new Date().getTime();
     let time_diff = today - tweetDate;
     let time = Math.floor(time_diff / day);
     let format = 'days ago';

     if (time_diff < mins_in_ms) {
       time = Math.floor(time_diff / secs_in_ms);
       format = 'seconds ago';
     } else if (time_diff < hour_in_ms) {
       time = Math.floor(time_diff / mins_in_ms);
       format = 'mins ago';
     } else if (time_diff < day) {
       time = Math.floor(time_diff / hour_in_ms);
       format = 'hours ago';
     }
     return [time, format];
   }

   function createTweetElement (tweetData) {
     let $article = $("<article></article").addClass('tweet');

     let $header = $("<header></header");
     $header.append($(`<img src="${tweetData.user.avatars.small}">`));
     $header.append($(`<h2>${tweetData.user.name}</h2>`));
     $header.append($(`<p>${tweetData.user.handle}</p>`));
     $article.append($header);
     let $text = $("<p></p>").text(`${tweetData.content.text}`);
     $article.append($text);

     let $footer = $("<footer></footer>");
     let time = getDays(tweetData.created_at);
     $footer.append(`<span class="age">${time[0]} ${time[1]}</span>`);
     let $footer_div = $("<div></div>");
     $footer_div.append('<i class="fas fa-flag">0</i>');
     $footer_div.append('<i class="fas fa-retweet">0</i>');
     let $like_button = $('<button class="fas fa-heart">0</button>');
     $like_button.on('click', function(){
       let count = Number($(this).text());
       $(this).text(count + 1);
     });
     $footer_div.append($like_button);
     $footer.append($footer_div);
     $article.append($footer);
     return $article;
   }

   function renderTweets (tweetData) {
     tweetData.forEach(function(user) {
       let $tweet = createTweetElement(user);
       $('.tweets').prepend($tweet);
     })
   }

   loadTweets();
 });
