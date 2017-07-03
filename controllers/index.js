var express = require('express');
var router = express.Router();
var path = require('path');


router.use('/animals', require('./animals'));

router.get('/', function(req, res){
  console.log("indexxxxxxx")
  res.sendFile(path.join(__dirname + '/../client/build/index.html'))
});

module.exports = router;