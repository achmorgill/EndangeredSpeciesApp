window.addEventListener('load', function(){

  console.log("In bulkLoad!");

  //from an array of names, pull back information from the RedList API.
  var namesArray = ["Loxodonta africana", "Lycaon pictus", "Thunnus alalunga", "Inia geoffrensis",
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
  "Pongo pygmaeus"];

  //build an array of IDs
  var idsArray = new Array(namesArray.length);
  var idsArrayCompressed = [];

  namesArray.forEach(function(name, index){

    var request = new XMLHttpRequest();
    var url = "http://apiv3.iucnredlist.org/api/v3/species/"+name+
      "?token=7fed1505eceb7b96fba16063a9b85a02b583179102f64c9c0d1bc482b2f2cba8";

    request.open("GET", url);
    request.send();

    request.addEventListener('load', function () {
      if (request.status === 200) {
        var jsonString = request.responseText;
        var data = JSON.parse(jsonString);
        // callback(data);
        console.log("Saving to position "+index, data);

        if (data.result[0] !== undefined ){
          idsArray[index] = data.result[0].taxonid;
        } else {
          idsArray[index] = -1;
        }

        console.log(idsArray);

        if (isComplete(idsArray)){
          console.log("Complete! idsArray: ", idsArray);
          idsArrayCompressed = compressArray(idsArray);
          console.log("Compressed array: ", idsArrayCompressed);

          //do some more stuff here!
        }
      }
    });
  });
  console.log("leaving bulkLoad!");
});

var compressArray = function(array){
  var returnArray = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] > 0){
      returnArray.push(array[i]);
    }
  }
  return returnArray;
}

var isComplete = function(array){
  var positionsFilled = 0;

  for (var i = 0; i < array.length; i++) {
    if (array[i]){
      positionsFilled++;
    }
  }
  return positionsFilled === array.length;
}
