var onLoad = function(){
  
  console.log("start of onLoad function!!")
  
 //  var request = new XMLHttpRequest()
 // var urlElephant = "http://apiv3.iucnredlist.org/api/v3/species/history/id/12392?token=7fed1505eceb7b96fba16063a9b85a02b583179102f64c9c0d1bc482b2f2cba8"
 // var urlLion = "http://apiv3.iucnredlist.org/api/v3/species/history/id/15951?token=7fed1505eceb7b96fba16063a9b85a02b583179102f64c9c0d1bc482b2f2cba8"
 // var urlWhale = "http://apiv3.iucnredlist.org/api/v3/species/history/id/2477?token=7fed1505eceb7b96fba16063a9b85a02b583179102f64c9c0d1bc482b2f2cba8"
 // var urlTurtle = "http://apiv3.iucnredlist.org/api/v3/species/history/id/3897?token=7fed1505eceb7b96fba16063a9b85a02b583179102f64c9c0d1bc482b2f2cba8"


 // request.open("GET", urlElephant);

 // request.open("GET", urlLion);

 // request.open("GET", urlWhale);

 // request.open("GET", urlTurtle);




 //  request.addEventListener( 'load', function( req, res ) {
 //    var jsonString = this.responseText;
 //    var allSpecies = JSON.parse( jsonString );  
 //    console.log(allSpecies);
 //  });

 //  request.send()

}

// onLoad();
window.addEventListener('load', onLoad)
