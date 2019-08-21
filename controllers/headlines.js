const srape = require("../scripts/scrape");

const Headline = require("../models/Headline");

// Save a reference to the Schema constructor


// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
module.exports ={
  // `title` is required and of type String
  fetch: function(cb){
      scrape(function(data){
          var headlines = data;
          for(var i=0; i<headlines.length; i++){
              headlines[i].saved = false;
          }
          Headline.collection.insertMany(headlines, function(err, res){
              cb(err, res);
          })
      })

  },
  get: function(query, cb){
      Headline.find(query).exec((err, doc) => cb(doc));
  }
  
};

