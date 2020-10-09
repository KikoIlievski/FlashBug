// Code adapted from Basile Pesin
// http://vertmo.github.io
var blobs = [];
var multiplier = 8; // contstant variable that shrinks the canvas to the percentage zoom in metaballs.html
// var distanceCoefficient = 20;
// var radius = 50;
var colours = {}
var red, green, blue, numBlobs, distanceCoefficient, radius; // values that will be determined by reading from google storage

function setup() {
	pixelDensity(1);
	createCanvas(Math.floor(window.innerWidth/multiplier) + 5, Math.floor(window.innerHeight/multiplier) + 5);
	frameRate(60);
	colorMode(RGB);
	// either getting user custom radius or setting to default value
	chrome.storage.sync.get("radius", result=>{ 
		if (!result["radius"] && result["radius"] != 0) { 
			chrome.storage.sync.set({"radius":50});
			radius = 50;
		} else { 
			radius = result["radius"];
		}
	});
	chrome.storage.sync.get("numBlobs", result=>{ // setting default value for numBlobs, or reading old value if exists
		if (result["numBlobs"] > 0) { 
			numBlobs = result["numBlobs"];
		} else { 
			chrome.storage.sync.set({"numBlobs":5})
			numBlobs = 5;
		}
		for (i = 0; i < numBlobs; i++) {
			blobs.push(new Blob(
				random(0, width), // x start pos 
				random(0, height), // y start pos
				radius)); // creating blobs and pushing them to list, random starting coords for each
		}
	});
	// either getting old values for colour, or setting to default upon first time installation
	chrome.storage.sync.get("red", result=>{
		if (!result["red"] && result["red"] != 0) { 
			chrome.storage.sync.set({"red":0});
			colours["red"] = 0;
		}else { 
			colours["red"] = result["red"];
		}
	});
	chrome.storage.sync.get("green", result=>{
		if (!result["green"] && result["green"] != 0) { 
			chrome.storage.sync.set({"green":1});
			colours["green"] = .75;
		} else { 
			colours["green"] = result["green"];
		}
	});
	chrome.storage.sync.get("blue", result=>{
		if (!result["blue"] && result["blue"] != 0) { 
			chrome.storage.sync.set({"blue":1});
			colours["blue"] = 1;
		} else { 
			colours["blue"] = result["blue"];
		}
	});
	// either getting user custom distance or setting to default upon first time installation
	chrome.storage.sync.get("coefficient", result=>{ 
		if (!result["coefficient"] && result["coefficient"] != 0) { 
			chrome.storage.sync.set({"coefficient":20});
			distanceCoefficient = 20;
		} else { 
			distanceCoefficient = result["coefficient"];
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
		if (key=="red" || key == "green" || key=="blue"){ // case colour is change
			colours[key] = storageChange["newValue"];
		} 
		if (key == "coefficient") { //case distance coefficient is changed
			distanceCoefficient = storageChange["newValue"];
		}
		if (key == "numBlobs") { //case num. blobs is changed
			let diff = Math.abs(blobs.length - storageChange["newValue"]); 
			if (diff == 0){
				break
			} else if (storageChange["newValue"] > blobs.length) { //case user wants more blobs 
			for (let i = 0; i < diff; i++ ){ 
				blobs.push(new Blob(
					random(0, width), // x start pos 
					random(0, height), // y start pos
					radius));
				}
			} else if (storageChange["newValue"] < blobs.length) { // case user wants less blobs
				for (let i = 0; i < diff; i++) { 
					blobs.pop();
				}
			}
		}
		if (key == "radius") { 
			radius = storageChange["newValue"]
			for (let i = 0; i < blobs.length; i++){
				 blobs[i].r = radius;
			}
		}
	}
});