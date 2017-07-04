var express = require('express');
var app = express();

var speciesController = require('./controllers/speciesController.js'); //deals with requests starting '/animals'
app.use('/species', speciesController);

app.use( express.static("public") ); //tells server to use the public folder for serving images, css, js etc


app.get("/", function( req, res ){

  //Bulk load
  

  res.sendFile( __dirname+"/client/build/index.html");

});

app.listen( 3005, function(){
  console.log("App running on port 3005!")
});
