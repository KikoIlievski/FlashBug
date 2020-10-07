// referencing slider objects
var redSlider = $(".red");
var greenSlider = $(".green");
var blueSlider = $(".blue");
var numBlobsInput = document.getElementById("numBlobsInput");

// setting values of sliders to value in storage (ie remembering old settings)
redSlider.slider({
    create: chrome.storage.sync.get("red", result=>{
            redSlider.slider("value", result["red"]);
    })
});
greenSlider.slider({
    create: chrome.storage.sync.get("green", result=>{
            greenSlider.slider("value", result["green"]);
    })
});
blueSlider.slider({
    create: chrome.storage.sync.get("blue", result=>{
            blueSlider.slider("value", result["blue"]);
    })
});

// setting the properties for all the sliders (max values, min values, step)
$(".colourSlider").slider( { 
    min:0,
    max:1,
    step:0.01
})

// handling changes in sliders by user
redSlider.slider({
    change: function(event) { 
        if (event.originalEvent){
            value = redSlider.slider("values", 0);
            chrome.storage.sync.set({"red": value});
        }
    }
});
greenSlider.slider({
    change: function(event) { 
        if (event.originalEvent){
            value = greenSlider.slider("values", 0);
            chrome.storage.sync.set({"green": value});
        }
    }
});
blueSlider.slider({
    change: function(event) { 
        if (event.originalEvent){
            value = blueSlider.slider("values", 0);
            chrome.storage.sync.set({"blue": value});
        }
    }
});

// initialising the starting value for the numBlobs
chrome.storage.sync.get("numBlobs", result=>{ 
    if (!result["numBlobs"]){ 
        chrome.storage.sync.set({"numBlobs":5});
    } else { 
        numBlobsInput.value = result["numBlobs"];
    }
});
// writing to chrome storage when input box is changed
numBlobsInput.addEventListener("input", event=>{ 
    chrome.storage.sync.set({"numBlobs":numBlobsInput.value});
});
