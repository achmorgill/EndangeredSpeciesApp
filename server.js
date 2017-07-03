var express = require('express');
var app = express();
var router = express.Router();

var path = require('path');

var bodyParser = require( 'body-parser' );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ));
app.use(require('./controllers/index.js'));

// var key = "7fed1505eceb7b96fba16063a9b85a02b583179102f64c9c0d1bc482b2f2cba8"

//by default returns the html file in client/build
app.use( express.static( 'client/build' ));

// //Most general route. Returns the html file.
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });


// //Returns an array of js PopulationSurvey objects
// app.get( '/animals', function( req, res ) {
//   // var id = req.params.id;
//   // res.json("hello!");

//   var request = new XMLHttpRequest();
//   var url = "http://apiv3.iucnredlist.org/api/v3/species/history/id/3897?token=7fed1505eceb7b96fba16063a9b85a02b583179102f64c9c0d1bc482b2f2cba8";
 
//  console.log("now here!");
  
//  request.open("GET", url);
//  request.addEventListener( 'load', function( req, res ) {
//    var jsonPopulationSurveys = request.responseText;
//    res.json(jsonPopulationSurveys);  

//  });
//  request.send();
// })



  app.listen(3000, function () {
  // var port = server.address().port;

  console.log('Example app listening at http: 3000');
});