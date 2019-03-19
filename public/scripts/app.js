/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function() {
   const data = [
     {
       "user": {
         "name": "Newton",
         "avatars": {
           "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
           "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
           "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
         },
         "handle": "@SirIsaac"
       },
       "content": {
         "text": "If I have seen further it is by standing on the shoulders of giants"
       },
       "created_at": 1461116232227
     },
     {
       "user": {
         "name": "Descartes",
         "avatars": {
           "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
           "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
           "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
         },
         "handle": "@rd" },
       "content": {
         "text": "Je pense , donc je suis"
       },
       "created_at": 1461113959088
     },
     {
       "user": {
         "name": "Johann von Goethe",
         "avatars": {
           "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
           "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
           "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
         },
         "handle": "@johann49"
       },
       "content": {
         "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
       },
       "created_at": 1461113796368
     }
   ];

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

   renderTweets(data);

 });
