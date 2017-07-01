var express = require('express');
var app = express();
// var path = require('path');

var bodyParser = require( 'body-parser' );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ));


app.use( express.static( 'client/build' ));
// app.use(require('./controllers/index.js'))


// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));

//   res.json({name: "Gill"})
// });

// app.get('/animals', function (req, res) {

//   // var request = new XMLHttpRequest();



//   var animals = {
//     list: {
//       animal1: {
//         name: 'Duck',
//         weight: 5
//       },
//       animal2: {
//         name: 'Dragon',
//         weight: 500 
//       }
//     }
//   }

//   res.json(animals);
// });



// app.use(express.static('public'));

  app.listen(3000, function () {
  // var port = server.address().port;

  console.log('Example app listening at http: 3000');
});