var isOn = false;
var screen = document.getElementById("TVS");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

document.getElementById("powerOn").addEventListener("click", function() {
  var light = document.getElementById("PLight");
  
  if (isOn) {
    light.style.backgroundColor = "black";
    isOn = false;
  } else {
    light.style.backgroundColor = "red";
    isOn = true;
  }
});

document.getElementById("powerOn").addEventListener("click", function() {
  if (isOn) {
    screen.style.backgroundColor = "white"; 
  } else {
    screen.style.backgroundColor = "black"; 
  }
});






