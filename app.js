//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
var posts = [{
entryHead : "Coronavirus: Confirmed global cases pass one million",
entryBody : "More than a million cases of coronavirus have been registered globally, according to the latest figures from Johns Hopkins University - another grim milestone as the world grapples with the spreading pandemic.Nearly 53,000people have died and more than 210,000 have recovered, according to the US university's figures.The US accounts for the most cases; Italy the highest death toll.The disease, Covid-19, first emerged in central China three months ago.Though the tally kept by Johns Hopkins records one million confirmed cases, the actual number is thought to be much higher.",
Date: "4/3/2020",
Publisher: "Daim"

},
{
entryHead : "Clap for Carers: UK applauds NHS staff and key workers",
entryBody : "People across the UK have taken part in a second Clap for Carers tribute, saluting NHS staff and other key workers dealing with the coronavirus pandemic.Delivery drivers, supermarket staff, care workers and bin collectors were among those honoured by the nation..",
Date: "1/3/2020",
Publisher: "Daim"

},

{
entryHead : "Coronavirus: Matt Hancock sets aim of 100,000 tests a day",
entryBody : "The government is aiming to carry out 100,000 coronavirus tests a day in England by the end of April, Health Secretary Matt Hancock said, as he announced a five-pillartesting plan.It comes as the government was criticised for not increasing the number of tests more quickly.Currently, there are around 10,000 tests being carried out a day.The new target includes swab tests, which are already in use, and blood tests, which are yet to be launched.It was originally thought the target would be for the whole of the UK, but the government later issued a correction saying the goal will only be for England..The number of people with the virus who have died in the UK has risen by 569, taking the total to 2,921 as of 17:00 BST on Wednesday.Speaking at the end of his seven days of quarantine after testing positive for the virus, Mr Hancock said 100,000 tests ",
Date: "4/3/2020",
Publisher: "Daim"

},
{
entryHead : "Coronavirus: Why does testing matter?",
entryBody : "More than a million cases of coronavirus have been registered globally, according to the latest figures from Johns Hopkins University - another grim milestone as the world grapples with the spreading pandemic.Nearly 53,000people have died and more than 210,000 have recovered, according to the US university's figures.The US accounts for the most cases; Italy the highest death toll.The disease, Covid-19, first emerged in central China three months ago.Though the tally kept by Johns Hopkins records one million confirmed cases, the actual number is thought to be much higher.",
Date: "4/3/2020",
Publisher: "James"

},




];
var _ = require("lodash");


//post = {"entryHead":pHead,"entryBody":pBody, "Date":pDate, "Publisher" :Publisher};

const homeStartingContent = "";
const aboutContent = "";
const contactContent = "";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  //res.render("home",{header1:h1, homePar:homeStartingContent, contactPar:contactContent, aboutPar:aboutContent});
  res.render("home",{ homePar:homeStartingContent, toDoList:posts});
});



app.get("/compose", function(req, res) {
  var h1 = "POST COMPOSER";
  res.render("compose",{header1:h1});
});

app.post("/compose", function(req, res) {
  pHead = req.body.postTitle;
  pBody = req.body.postBody;
  pDate = req.body.date;
  Publisher = req.body.publisher;
  post = {"entryHead":pHead,"entryBody":pBody, "Date":pDate, "Publisher" :Publisher};
  posts.push(post);
  console.log(posts);
  res.redirect("/");
});

app.get("/posts/:entryTitle", function (req, res) {
  var targetTitle = _.lowerCase(req.params.entryTitle);

  posts.forEach (function(entry) {

    if (_.lowerCase(entry.entryHead) === targetTitle) {
      console.log("MATCH FOUND : "+entry.entryHead);
      res.render("post",{entryHead:entry.entryHead,entryBody:entry.entryBody, publisher: entry.Publisher, Date: entry.Date });
    }
  });
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
