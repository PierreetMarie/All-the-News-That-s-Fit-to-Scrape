
var cheerio = require("cheerio");
var express = require("express")
var axios = require("axios");
var app = express();
var mongojs = require("mongojs");
var database = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function(err) {
  console.log("Database Error:", err);
});

app.get('/', function(req, res) {
  res.send("Hello world");
});

app.get("/all", function(req, res) {
  db.scrapedData.find({}, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});

app.get('/scrape', function(req, res) {
  request('https://news.ycombinator.com/', function(error, response, html) {
    var $ = cheerio.load(html);
      $('.title').each(function(i, element) {
        var title = $(this).children('a').text();
        var link = $(this).children('a').attr('href');
          if (title && link) {
            db.scrapedData.save({
              title: title,
            });
          }
      })
    }
  })
})


console.log("\n***********************************\n" +
  "Grabbing every thread name and link\n" +
  "from reddit's webdev board:" +
  "\n***********************************\n");

request("https://old.reddit.com/r/webdev/", function (error, response, html) {


  var $ = cheerio.load(html);

  var results = [];


  $("p.title").each(function (i, element) {


    var title = $(this).text();


    var link = $(element).children().attr("href");


    results.push({
      title: title,
      link: link
    });
  });

  
  console.log(results);
});
