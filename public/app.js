window.addEventListener('load', function(){

  var side = document.getElementById('side-content');

  side.innerHTML = getDefaultHTML();

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
      console.log("this.value: ", this.value) //*************************** bug!
      renderContainer(animal, this.value)
    }.bind(this));
  }

  getAllJson(renderAll);
});//addEventListener


var getDefaultHTML = function(){

  var displayText = "Established in 1964, the IUCN Red List of Threatened Species has evolved to become the world’s "+
          "most comprehensive information source on the global conservation status of animal, fungi and plant species."+
          "<p>It is a critical indicator of the health of the world’s biodiversity. Far more than a list of species and their "+
          "status, it is a powerful tool to inform and catalyze action for biodiversity conservation and policy change, "+
          "critical to protecting the natural resources we need to survive.</p><p>It provides information about range, population "+
          "size, habitat and ecology, use and/or trade, threats, and conservation actions that will help inform necessary "+
          "conservation decisions.</p>";

    return "<img width='50' id='logo' src=\"./RedListLogo.png\"/>"+"<p>"+displayText+"</p>"+
      '<iframe width="90%" height="315" src="https://www.youtube.com/embed/w7GQZsGmW5Y" frameborder="0" allowfullscreen></iframe>'
}

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

  if (year === undefined) year = 1999;  // ************************ bug fix!!

  var div = document.createElement("div");
  div.className = "circle-div";

  var image = document.createElement("img");
  image.src = "croppedImages/" + animal.id + ".jpg"
  div.appendChild(image);

  var outer = document.getElementById("box-container")

  var head = document.createElement("p");
  var current = getCurrentStatus(animal, year)
  head.innerHTML = animal.name + "<br/>" + current;


  div.appendChild(head)

  div.appendChild(renderCircle(animal, year));

  div.addEventListener('click', function(event){

    var arr = [].slice.call(document.getElementsByClassName("bg-circle"));
    arr.forEach(function(item){
      item.classList.remove("selected")
    });

    renderSidebar(animal);
    var selected = document.getElementById(animal.id)
    selected.classList.add("selected")
  })
  outer.appendChild(div);
};

var renderSidebar = function(animal){

  var side = document.getElementById("side-content");
  side.scrollTop = 0;
  side.innerText = "";

  var header = document.createElement("h2");
  header.innerText = animal.name;
  side.appendChild(header);

  var image = document.createElement("img");
  image.src = "images/" + animal.id + ".jpg"
  side.appendChild(image)

  var main = document.createElement('p');
  main.id = "infoText"
  main.innerHTML = getDefaultText(animal.narrative.population, "No information available.");

  var ul = buildUl(animal, main);
  side.appendChild(ul);

  side.appendChild(main);
}

var buildUl = function(animal, main){
  var ul = document.createElement('ul');
  ul.id = "li-menu"

  var liPopulation = document.createElement('li');
  liPopulation.id = "liPopulation";
  liPopulation.innerText = "Population";

  liPopulation.addEventListener("click", function() {
    main.innerHTML = getDefaultText(animal.narrative.population, "No information available.");
  })

  var liThreats = document.createElement('li');
  liThreats.innerText = "Threats";

  liThreats.addEventListener("click", function() {
    main.innerHTML = getDefaultText(animal.narrative.threats, "No information available.");
  })

  var liHabitat = document.createElement('li');
  liHabitat.innerText = "Habitat";

  liHabitat.addEventListener("click", function() {
    main.innerHTML = animal.narrative.habitat;
  })

  var liRange = document.createElement('li');
  liRange.innerText = "Range";

  liRange.addEventListener("click", function() {
    main.innerHTML = animal.narrative.range;
  })


  ul.appendChild(liPopulation)
  ul.appendChild(liThreats)
  ul.appendChild(liHabitat)
  ul.appendChild(liRange)

  return ul;
  // var linkPopulation = document.createElement('a');


}

var getDefaultText = function(text, defaultText){
  if (text === null || text.length === 0){
    console.log("AAA")
    return defaultText;
  } else {
    console.log("BBB")
    return text;
  }
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
