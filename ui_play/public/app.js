var app = function(){

  var height = document.body.scrollHeight
  console.log(height)
  var main = document.getElementById("main-div");
  main.style.height = height + "px";



var animal = {
  "id": "12392",
  "name": "African Elephant",
  "result": [
    {
      "year": "2008",
      "code": "VU",
      "category": "Vulnerable"
    },
    {
      "year": "2004",
      "code": "VU",
      "category": "Vulnerable"
    },
    {
      "year": "1996",
      "code": "EN",
      "category": "Endangered"
    },
    {
      "year": "1994",
      "code": "V",
      "category": "Vulnerable"
    },
    {
      "year": "1990",
      "code": "V",
      "category": "Vulnerable"
    },
    {
      "year": "1988",
      "code": "V",
      "category": "Vulnerable"
    },
    {
      "year": "1986",
      "code": "V",
      "category": "Vulnerable"
    }
  ]
}

  var renderContainer = function(animal){
    var div = document.createElement("div");
    div.className = "circle-div";
    var outer = document.getElementById("box-container")

    var head = document.createElement("p");
    head.innerText = animal.name;
    div.appendChild(head)

    div.appendChild(renderCircle(animal));
    outer.appendChild(div);
  }

  var renderCircle = function(animal){
    var bgCircle = document.createElement("div");
    bgCircle.className = "bg-circle";
    var inner = renderInnerCircle(animal)
    bgCircle.appendChild(inner);
    return bgCircle;
  }

  var renderInnerCircle = function(animal){
    var innerCircle = document.createElement("div");
    innerCircle.className = "inner-circle";
    innerCircle.id = animal.id;
    // innerCircle.innerText = animal.name;
    // need a function somewhere to render to a specific size and assign colour - by class?
    return innerCircle;
  }

  renderContainer(animal)
  renderContainer(animal)
  renderContainer(animal)
  renderContainer(animal)
  renderContainer(animal)
  renderContainer(animal)
  renderContainer(animal)
  renderContainer(animal)
  renderContainer(animal)

}

window.addEventListener("load", app);
