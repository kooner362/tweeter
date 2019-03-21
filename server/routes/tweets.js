"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    // DataHelpers.getTweets((err, tweets) => {
    //   if (err) {
    //     res.status(500).json({ error: err.message });
    //   } else {
    //     res.json(tweets);
    //   }
    // });
    MongoClient.connect(MONGODB_URI, (err, db) => {
      if (err) {
        console.error(`Failed to connect: ${MONGODB_URI}`);
        throw err;
      }

      console.log(`Connected to mongodb: ${MONGODB_URI}`);

      function getTweets(callback) {
        db.collection("tweets").find().toArray((err, tweets) => {
          if (err) {
            return callback(err);
          }
          callback(null, tweets);
        });
      }

      getTweets((err, tweets) => {
        if (err) res.status(500).json({ error: err.message });
        res.json(tweets);
        db.close();
      });

    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send(tweet);
      }
    });
  });

  return tweetsRoutes;

}
