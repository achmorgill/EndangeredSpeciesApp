window.addEventListener('load', function(){

  console.log("App loaded!");

  var slider = document.getElementById("rangeSlider")

  slider.addEventListener('input', function(){
    getSpeciesJson("africanElephant", renderElephantDiv.bind(this));
    // console.log(slider.value)
  })

  



  var renderElephantDiv = function(data){
    console.log("slider value!=", this.value)

  };




});

var showElephant = function(elephant){

}

var getSpeciesJson = function(speciesName, callback){

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

  var dataToReturn;

  var request = new XMLHttpRequest();

  request.open("GET", url);
  request.send();
  request.addEventListener('load', function () {
    if (request.status === 200) {
      var jsonString = request.responseText;
      var data = JSON.parse(jsonString);
      // console.log("Data received from server: ", data);
      callback(data);
    }
  });

}
