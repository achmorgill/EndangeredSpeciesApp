var express = require('express')
var app = express();
var animalsRouter = express.Router();

// //models
// var Animal = require('../client/src/models/animal');
// var CountryQuery = require('../db/country_query.js');

// var query = new CountryQuery();

//country index 
animalsRouter.get('/animals', function(req, res) {
  console.log("heeeeeereeeeee")
 // var request = new XMLHttpRequest();
 // var url = "http://apiv3.iucnredlist.org/api/v3/species/history/id/3897?token=7fed1505eceb7b96fba16063a9b85a02b583179102f64c9c0d1bc482b2f2cba8";

 // res.json("now here!");

 // request.open("GET", url);
 // request.addEventListener( 'load', function( req, res ) {
 //  var jsonPopulationSurveys = request.responseText;
 //  res.json(jsonPopulationSurveys);  

 //  });
 // request.send();
})

//write data to the database
// countriesRouter.post('/', function(req, res){
//   var newCountry = new Country({
//     name: req.body.name
//   }) ;
// console.log("adding new country", newCountry)

//   query.add(newCountry, function(allCountries) {
//     res.json(allCountries);
//   })
// })



module.exports = animalsRouter;