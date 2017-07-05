window.addEventListener('load', function(){

  var height = document.body.scrollHeight
  var main = document.getElementById("main-div");
  main.style.height = height + "px";

  var slider = document.getElementById("rangeSlider")

  slider.addEventListener('input', function(){
    getAllJson(renderAll.bind(this));
  })

  var renderAll = function(data){
    document.getElementById("box-container").innerHTML = "";
    data.forEach(function(animal){
      renderContainer(animal, this.value)
    }.bind(this));
  }

  getAllJson(renderAll);
});//addEventListener


var getAllJson = function(callback){

  var request = new XMLHttpRequest();
  var url = "http://localhost:3005/species/all";

  request.open("GET", url);
  request.send();

  request.addEventListener('load', function() {
    if (request.status === 200) {
      var jsonString = request.responseText;
      var data = JSON.parse(jsonString);
      callback(data);
    }
  });
}

var renderContainer = function(animal, year){

  var div = document.createElement("div");
  div.className = "circle-div";

  var image = document.createElement("img");
  image.src = "croppedImages/" + animal.id + ".jpg"
  div.appendChild(image);

  var outer = document.getElementById("box-container")

  var head = document.createElement("p");
  head.innerText = animal.name;

  div.appendChild(head)

  div.appendChild(renderCircle(animal, year));

  div.addEventListener('click', function(event){

    var arr = [].slice.call(document.getElementsByClassName("bg-circle"));
    arr.forEach(function(item){
      item.classList.remove("selected")
    })

    renderSidebar(animal);
    var selected = document.getElementById(animal.id)
    selected.classList.add("selected")
  })
  outer.appendChild(div);
}

var renderSidebar = function(animal){

  var side = document.getElementById("side-content");
  side.innerHTML = "";

  var header = document.createElement("h2");
  header.innerText = animal.name;
  side.appendChild(header);

  var image = document.createElement("img");
  image.src = "images/" + animal.id + ".jpg"
  side.appendChild(image)

  var main = document.createElement("p")
  main.innerHTML = animal.narrative.habitat;

  side.appendChild(main)
  // TODO: complete data
}

var renderCircle = function(animal, year){
  var bgCircle = document.createElement("div");
  bgCircle.className = "bg-circle";
  bgCircle.id = animal.id;
  var inner = renderInnerCircle(animal, year)
  bgCircle.appendChild(inner);
  return bgCircle;
}

var renderInnerCircle = function(animal, year){
  if (!year){ year = 1999}
  var currentStatus = getCurrentStatus(animal, year);
  var innerCircle = document.createElement("div");

  var newClass;

  if (currentStatus === "Extinct in the Wild"){
    newClass = "extinct";
  }
  else if ( currentStatus === "Critically Endangered" ||
            currentStatus === "\"Very rare and believed to be decreasing in numbers\""){
    newClass = "critical";
  }
  else if (currentStatus === "Endangered" ||
           currentStatus === "\"Very rare but believed to be stable or increasing\""){
    newClass = "endangered";
  }
  else if (currentStatus === "Vulnerable" ||
           currentStatus === "Rare"){
    newClass = "vulnerable";
  }
  else if (currentStatus === "Near Threatened" ||
           currentStatus === "Lower Risk/near threatened" ||
           currentStatus === "\"Less rare but believed to be threatened-requires watching\""){
    newClass = "near_threatened";
  }
  else if (currentStatus === "Least Concern" ||
             currentStatus === "Lower Risk/conservation dependent" ||
             currentStatus === "Lower Risk/least concern" ){
    newClass = "least";
  }
  else if (currentStatus === "Insufficiently Known" ||
           currentStatus === "Data Deficient" ||
           currentStatus === "Indeterminate" ||
           currentStatus === "Not Recognized" ||
           currentStatus === "\"Status inadequately known-survey required or data sought\""){
    newClass = "unknown";
  }
  else {
    newClass = "other";
  }

  innerCircle.className = "inner-circle " + newClass;
  return innerCircle;
}

var getCurrentStatus = function(animal, currentYear){
  var assessmentArray = animal.result
  var arrayLength = assessmentArray.length

  var index = 0;
  while ( index < (arrayLength-1) && (Number(assessmentArray[index].year) > Number(currentYear))){
    index++;
  }

  var currentStatus = assessmentArray[index].category;
  return currentStatus;

}
