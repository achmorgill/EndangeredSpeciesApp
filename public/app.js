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

});



var getAllJson = function(callback){

  var request = new XMLHttpRequest();
  var url = "http://localhost:3005/species/all";

  request.open("GET", url);
  request.send();

  request.addEventListener('load', function() {
    if (request.status === 200) {
      var jsonString = request.responseText;
      var data = JSON.parse(jsonString);
      console.log("All data received from server: ", data);
      callback(data);
    }
  });
}

var renderContainer = function(animal, year){
  console.log("Animal!: ", animal)
  var div = document.createElement("div");
  div.className = "circle-div";
  var outer = document.getElementById("box-container")

  var head = document.createElement("p");
  console.log("animal id 72", animal.id)
  head.innerText = animal.name;
  div.appendChild(head)

  div.appendChild(renderCircle(animal, year));
  outer.appendChild(div);
}

var renderCircle = function(animal, year){
  var bgCircle = document.createElement("div");
  bgCircle.className = "bg-circle";
  var inner = renderInnerCircle(animal, year)
  bgCircle.appendChild(inner);
  return bgCircle;
}

var renderInnerCircle = function(animal, year){
  if (!year){ year = 1999}
  var currentStatus = getCurrentStatus(animal, year);
  var innerCircle = document.createElement("div");

  var newClass;
  if (currentStatus === "Vulnerable"){
    newClass = "vulnerable"
  } else {
    newClass = "endangered"
  }

  innerCircle.className = "inner-circle " + newClass;
  innerCircle.id = animal.id;
  return innerCircle;
}

var getCurrentStatus = function(animal, currentYear){
  var assessmentArray = animal.result
  var arrayLength = assessmentArray.length

  console.log("Looking for status at: ", currentYear)

  var index = 0;
  while ( index < (arrayLength-1) && (Number(assessmentArray[index].year) > Number(currentYear))){
    index++;
  }

  var currentStatus = assessmentArray[index].category;
  console.log("Conservation status at "+currentYear+" is ", currentStatus);

  return currentStatus;

}
