const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const screen = document.getElementById("TVS");
const PO = document.getElementById('powerOn');
const light = document.getElementById("PLight");
const optionsDiv = document.getElementById('options');
const chooseDiv = document.getElementById('choose');
const Detail = document.getElementById('detail');
const Info = document.getElementById('dMessage');
const first = document.getElementById('ch1');
const second = document.getElementById('ch2');
const third = document.getElementById('ch3');
const tvStatic = document.getElementById('ch0')
const chUP = document.getElementById('channelUp')
const chDOWN = document.getElementById('channelDown')


function generateStatic() {
  // Set canvas size
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Update static noise pattern
  requestAnimationFrame(generateStatic);

  // Generate static noise
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
      // Generate random noise for each color channel
      const randomValue = Math.floor(Math.random() * 256);
      data[i] = randomValue; // Red channel
      data[i + 1] = randomValue; // Green channel
      data[i + 2] = randomValue; // Blue channel
      data[i + 3] = 255; // Alpha channel (fully opaque)
  }

  // Put the generated noise onto the canvas
  ctx.putImageData(imageData, 0, 0);
}

// Toggle the display of static noise when ch0 is selected
function toggleStatic() {
    canvas.style.opacity = (canvas.style.opacity === "1") ? "0" : "1";
}

// Event listener for toggling static noise on ch0
tvStatic.addEventListener("click", toggleStatic);

// Generate initial static noise
generateStatic();


var isOn = false;
PO.addEventListener("click", function() {
  if (isOn) {
    light.style.backgroundColor = "black";
    isOn = false;
  } else {
    light.style.backgroundColor = "red";
    isOn = true;
  }
});

PO.addEventListener("click", () => {
  first.classList.toggle('show')
  if (second.classList.contains('show')) {
    second.classList.remove('show');
    first.classList.remove('show');
  } else if (third.classList.contains('show')) {
    third.classList.remove('show');
    first.classList.remove('show');
  } else if (tvStatic.classList.contains('show')) {
    tvStatic.classList.remove('show');
    first.classList.remove('show');
  }
});

chUP.addEventListener("click", () => {
  if (first.classList.contains('show')) {
    first.classList.remove('show');
    second.classList.add('show');
  } else if (second.classList.contains('show')) {
    second.classList.remove('show');
    third.classList.add('show');
  } else if (third.classList.contains('show')) {
    third.classList.remove('show');
    tvStatic.classList.add('show');
  }else if (tvStatic.classList.contains('show')) { // Add this block for ch0
    tvStatic.classList.remove('show');
    first.classList.add('show');
  }
});

chDOWN.addEventListener("click", () => {
  if (first.classList.contains('show')) {
    first.classList.remove('show');
    tvStatic.classList.add('show');
  } else if (second.classList.contains('show')) {
    second.classList.remove('show');
    first.classList.add('show');
  } else if (third.classList.contains('show')) {
    third.classList.remove('show');
    second.classList.add('show');
  } else if (tvStatic.classList.contains('show')) {
    tvStatic.classList.remove('show');
    third.classList.add('show');
  }
});

optionsDiv.addEventListener('click', () => {
  chooseDiv.classList.toggle('show');
  chooseDiv.classList.toggle('enlarge');
});

Detail.addEventListener('click', () => {
  Info.classList.toggle('show')
});