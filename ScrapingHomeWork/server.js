
var cheerio = require("cheerio");

var axios = require("axios");


console.log("\n***********************************\n" +
  "Grabbing every thread name and link\n" +
  "from reddit's webdev board:" +
  "\n***********************************\n");


axios.get("https://old.reddit.com/r/webdev/").then(function (response) {


  var $ = cheerio.load(response.data);

  var results = [];


  $("p.title").each(function (i, element) {


    var title = $(element).text();


    var link = $(element).children().attr("href");


    results.push({
      title: title,
      link: link
    });
  });

  /
  console.log(results);
});
