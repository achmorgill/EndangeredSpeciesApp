var request = require('request');
var MongoClient = require('mongodb').MongoClient


//from an array of names, pull back information from the RedList API.
var namesArray = ["Loxodonta africana", "Lycaon pictus",
"Thunnus alalunga", "Inia geoffrensis",
"Panthera pardus orientalis", "Panthera tigris altaica", "Vulpes lagopus", "Canis lupus arctos",
"Elephas maximus indicus", "Delphinapterus leucas", "Panthera tigris tigris", "Thunnus obesus",
"Diceros bicornis", "Ateles paniscus", "Mustela nigripes", "Balaenoptera musculus", "Thunnus spp",
"Pan paniscus", "Pongo pygmaeus", "Elephas maximus borneensis", "Balaena mysticetus", "Ursus arctos",
"Pan troglodytes", "Tursiops truncates", "Gorilla gorilla diehli", "Dugong dugon", "Gorilla beringei graueri",
"Balaenoptera physalus", "Spheniscus mendiculus", "Platanista gangetica gangetica", "Ailuropoda melanoleuca",
"Gorilla gorilla", "Gorilla beringei", "Eschrichtius robustus", "Carcharodon carcharias", "Rhinoceros unicornis",
"Centrocercus urophasianus", "Chelonia mydas", "Eretmochelys imbricata", "Cephalorhynchus hectori",
"Hippopotamus amphibius", "Cheilinus undulatus", "Elephas maximus indicus", "Panthera tigris corbetti",
"Orcaella brevirostris", "Panthera onca", "Rhinoceros sondaicus", "Dermochelys coriacea",
"Caretta caretta", "Ara ararauna", "Panthera tigris jacksoni", "Amblyrhynchus cristatus",
"Gorilla beringei beringei", "Charadrius montanus", "Monodon monoceros", "Eubalaena glacialis", "Lepidochelys olivacea",
"Pongo pygmaeus"
];

var animalObjectArray = [];
var animalObjectArrayCompressed = [];

namesArray.forEach(function(scientificName, index){

    request("http://apiv3.iucnredlist.org/api/v3/species/" + scientificName +
    "?token=7fed1505eceb7b96fba16063a9b85a02b583179102f64c9c0d1bc482b2f2cba8", function (error, response, body){

      if (response.statusCode !== 200) return;

      var data = JSON.parse(body);

      if (data.result[0] !== undefined ){

        var speciesName = data.result[0].main_common_name;
        var speciesId = data.result[0].taxonid;

        //create an object
        var animalObject = {
          id: speciesId,
          name: speciesName,
          latinName: scientificName,
          result: [],
          narrative: null
        }
        animalObjectArray.push(animalObject);

      }
      else {
        animalObjectArray.push(undefined);
      }

      if (isComplete(animalObjectArray, namesArray)){
        // console.log("Complete! animalObjectArray: ", animalObjectArray);

        animalObjectArrayCompressed = compressArray(animalObjectArray);
        // console.log("Compressed array: ", animalObjectArrayCompressed);

        getNarratives(animalObjectArrayCompressed);
      }
    }); //request
});//forEach


var getNarratives = function(animalArray){

  var rootUrl = "http://apiv3.iucnredlist.org/api/v3/species/narrative/";
  var endUrl = "?token=7fed1505eceb7b96fba16063a9b85a02b583179102f64c9c0d1bc482b2f2cba8";

  animalArray.forEach(function(animal, index){

    request (rootUrl + animal.latinName + endUrl, function (error, response, body) {
      var data = JSON.parse(body);

      if (response.statusCode != 200) return;

        animal.narrative = {
          population: data.result[0].population,
          threats: data.result[0].threats,
          habitat: data.result[0].habitat,
          range: data.result[0].geographicrange
        };

        if (allNarrativesAdded(animalArray)){
          // console.log("animalArray with narratives added::", animalArray);
          getSurveyResults(animalArray);
        }
    });//request
  });//forEach
}//getNarratives

var getSurveyResults = function(animalArray){

  var rootUrl = "http://apiv3.iucnredlist.org/api/v3/species/history/name/";
  var endUrl = "?token=7fed1505eceb7b96fba16063a9b85a02b583179102f64c9c0d1bc482b2f2cba8";

  animalArray.forEach(function(animal, index){

    request (rootUrl + animal.latinName + endUrl, function (error, response, body) {
      var data = JSON.parse(body);

      if (response.statusCode != 200) return;

        animal.result = data.result;

        if (allResultsAdded(animalArray)){
          loadDatabase(animalArray);
        }
    });//request
  });//forEach
}//getResults

var loadDatabase = function(animalArray){

  MongoClient.connect("mongodb://localhost:27017/endangeredAnimals", function(err, db){

    if (db){
      db.collection("species").remove({});
      db.collection("species").insert(animalArray);
      db.close();
    }
  });

}//loadDatabase

var allResultsAdded = function(animalArray){

  var count = 0;
  for (var i = 0; i < animalArray.length; i++) {
    if (animalArray[i].result.length !== 0)
      count++;
  }
  return count === animalArray.length;
}

var allNarrativesAdded = function(animalArray){

  var count = 0;
  for (var i = 0; i < animalArray.length; i++) {
    if (animalArray[i].narrative !== null)
      count++;
  }
  return count === animalArray.length;

}//allNarrativesAdded

var compressArray = function(array){
  var returnArray = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] !== undefined){
      returnArray.push(array[i]);
    }
  }
  return returnArray;
}//compressArray

var isComplete = function(array1, array2){
  return array1.length === array2.length;
}//isComplete

var initialiseArray = function(array){
  for (var i = 0; i < array.length; i++) {
    array[i] = null;
  }
}//initialiseArray
