const express =require("express");
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();
router.get("/", (req, res) => {
    res.render("home");
})
router.get("/scrape", (req, res) => {
    console.log("inside the scrape route");
    var headlines = [];
    axios.get("https://www.npr.org").then(function(response) {

    // Load the Response into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape
    var results = [];

    // With cheerio, find each h3-tag with the "title" class
    $(".story-text").each(function(i, element) {

        var link = $(element).find("a").attr("href");

        // Save the text of the element in a "title" variable
        var title = $(element).find("h3").text();

        // In the currently selected element, look at its child elements (i.e., its a-tags),
        // then save the values for any "href" attributes that the child elements may have
        //var link = $(element).attr("href");

        // Save these results in an object that we'll push into the results array we defined earlier
        var headlinesToAdd = {
            title: title,
            link: link,
            saved: false
        }
        console.log(headlinesToAdd);
        headlines.push(headlinesToAdd);
    });

    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);
    db.Headline.create(headlines)
    .then(function(dbHeadlines){
        res.render("home", {db_headlines: dbHeadlines});
    })
    .catch((err) => {
        console.log(err);
    })
    });
    //res.send("complete");
})

module.exports = router;