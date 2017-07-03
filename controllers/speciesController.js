// speciesController.js - species route module

var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;


//get json for all species
router.get('/all', function(req, res) {

  MongoClient.connect("mongodb://localhost:27017/species", function(err, db){
    db.collection("species").find().toArray(function(err, docs){
      res.json(docs);
      db.close();
    });
  });
});

//get json for one particular species with id :id
router.get('/:id', function(req, res) {

  var id = req.params.id.toString();

  MongoClient.connect("mongodb://localhost:27017/species", function(err, db){

    // db.collection("species").find().toArray(function(err, docs){
    db.collection("species").find( { "name": id } ).toArray(function(err, docs){
      res.json(docs);
      db.close();
    });
  });
});

module.exports = router;
