"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
var ObjectId = require('mongodb').ObjectId;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Updates a tweets likes to `db`
    updateLikes: function(id, incr, callback) {
      let new_id = new ObjectId(id);
      if (incr === 'false') {
        db.collection("tweets").findOneAndUpdate({"_id": new_id}, {$inc:{'content.likes': 1}})
        .then(function(data){
          callback(null, true);
        })
      } else {
        db.collection("tweets").findOneAndUpdate({"_id": new_id}, {$inc:{'content.likes': -1}})
        .then(function(data){
          callback(null, true);
        })
      }
    
    },

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, tweets.sort(sortNewestFirst));
      });
    }
  };
}
