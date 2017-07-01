var onLoad = function(){
  
  console.log("start of onLoad function!!")
  
  var request = new XMLHttpRequest()
 var url = "http://apiv3.iucnredlist.org/api/v3/species/history/id/12392?token=7fed1505eceb7b96fba16063a9b85a02b583179102f64c9c0d1bc482b2f2cba8"
 request.open("GET", url);



  request.addEventListener( 'load', function( req, res ) {
    var jsonString = this.responseText;
    var allSpecies = JSON.parse( jsonString );  
    console.log(allSpecies);

  });

  request.send()

}

// onLoad();
window.addEventListener('load', onLoad)
