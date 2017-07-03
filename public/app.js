window.addEventListener('load', function(){

  console.log("App loaded!");

  getSpeciesJson("africanElephant");

});

var getSpeciesJson = function(speciesName){

  switch(speciesName) {
    case "africanElephant":
        url = "http://localhost:3005/species/12392";
        break;
    case "africanLion":
        url = "http://localhost:3005/species/15951";
        break;
    case "blueWhale":
        url = "http://localhost:3005/species/2477";
        break;
    case "loggerheadTurtle":
        url = "http://localhost:3005/species/3897";
        break;
  }

  var request = new XMLHttpRequest();

  request.open("GET", url);
  request.send();
  request.addEventListener('load', function () {
    if (request.status === 200) {
      var jsonString = request.responseText;
      var data = JSON.parse(jsonString);
      console.log("Data received from server: ", data);
    }
  });
}
