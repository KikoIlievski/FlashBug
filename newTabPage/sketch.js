// Code adapted from Basile Pesin
// http://vertmo.github.io
var blobs = [];
var multiplier = 8;
var distanceCoefficient = 10;
var radius = 200;
var colours = {}
var red, green, blue, numBlobs; // values that will be determined by reading from google storage

function setup() {
  pixelDensity(1);
  createCanvas(Math.floor(window.innerWidth/multiplier) + 5, Math.floor(window.innerHeight/multiplier) + 5);
  frameRate(60);
  colorMode(RGB);
  chrome.storage.sync.get("numBlobs", result=>{ 
    numBlobs = result["numBlobs"] ? result["numBlobs"] : 4; 
    for (i = 0; i < numBlobs; i++) {
      blobs.push(new Blob(
        random(0, width), // x start pos 
        random(0, height), // y start pos
        radius)); // creating blobs and pushing them to list, random starting coords for each
    }
  });
  // Setting default values for circles if storage empty (first time installation), or saved prev values and setting those
  chrome.storage.sync.get("red", result=>{
    if (!result["red"] && result["red"] != 0) { 
      chrome.storage.sync.set({"red":0})
      colours["red"] = 0;
    }else { 
      colours["red"] = result["red"];
    }
  });
  chrome.storage.sync.get("green", result=>{
    if (!result["green"] && result["green"] != 0) { 
      chrome.storage.sync.set({"green":1})
      colours["green"] = 1;
    } else { 
      colours["green"] = result["green"];
    }
  });
  chrome.storage.sync.get("blue", result=>{
    if (!result["blue"] && result["blue"] != 0) { 
      chrome.storage.sync.set({"blue":1})
      colours["blue"] = 1;
    } else { 
      colours["blue"] = result["blue"];
    }
  });
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

      set(x, y, color(sum*colours["red"], sum*colours["green"], sum*colours["blue"]));
      
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

chrome.storage.onChanged.addListener(function(changes, namespace) { 
  for (var key in changes) { 
    var storageChange = changes[key];
    colours[key] = storageChange["newValue"];
  }
});