// Code adapted from Basile Pesin
// http://vertmo.github.io
var blobs = [];
var multiplier = 8;
var distanceCoefficient = 400;
var radius = 4;

function setup() {
  pixelDensity(1);
  createCanvas(Math.floor(window.innerWidth/multiplier) + 5, Math.floor(window.innerHeight/multiplier) + 5);
  frameRate(60);
  colorMode(RGB);
  for (i = 0; i < 4; i++) {
    blobs.push(new Blob(
      random(0, width), // x start pos 
      random(0, height), // y start pos
      radius)); // creating blobs and pushing them to list, random starting coords for each
  }

}

function draw() {
  background(50);
  loadPixels();
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      let sum = 0;
      for (i = 0; i < blobs.length; i++) {
        let xdif = x - blobs[i].x;
        let ydif = y - blobs[i].y;
        let d = sqrt((xdif * xdif) + (ydif * ydif));
        sum += distanceCoefficient * blobs[i].r / d;
      }
      // set(x, y, color(sum, 255-sum, 255));
      set(x, y, color(sum, 0, sum));
      
    }
  }
  updatePixels();

  for (i = 0; i < blobs.length; i++) {
    blobs[i].update();
  }
}

function windowResized() {
  resizeCanvas(Math.floor(window.innerWidth/multiplier) + 5, Math.floor(window.innerHeight/multiplier) + 5);
}

chrome.storage.onChanged.addListener(function(changes, nampespace) { 
  console.log("change detected in chrome storage; sketch.js");
  // for (var key in changes) { 
  //   var storageChange = changes[key];
  //   console.log(storageChange);
  // }
});