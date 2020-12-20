// referencing slider objects
var redSlider = $(".red");
var greenSlider = $(".green");
var blueSlider = $(".blue");
var coefficientSlider = $(".coefficient");
var radiusSlider = $(".radius");
var numBlobsInput = document.getElementById("numBlobsInput");
var spectrumToggle = document.getElementById("spectrumCycle");

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
coefficientSlider.slider({
    create:chrome.storage.sync.get("coefficient", result=>{
        coefficientSlider.slider("value", result["coefficient"])
    })
})
radiusSlider.slider({
    create:chrome.storage.sync.get("radius", result=>{
        radiusSlider.slider("value", result["radius"])
    })
})

// setting the properties for all the sliders (max values, min values, step)
$(".colourSlider").slider({ 
    min:0,
    max:1,
    step:0.01
})
$(".coefficient").slider({ 
    min: 1,
    max: 40, 
    step: .1
});
$(".radius").slider({ 
    min: 1,
    max: 200, 
    step: 1
});

// handling changes in sliders by user. This is so programamtic changes do not trigger changes in storage
redSlider.slider({
    change: function(event) { 
        if (event.originalEvent){
            let value = redSlider.slider("values", 0);
            chrome.storage.sync.set({"red": value});
        }
    }
});
greenSlider.slider({
    change: function(event) { 
        if (event.originalEvent){
            let value = greenSlider.slider("values", 0);
            chrome.storage.sync.set({"green": value});
        }
    }
});
blueSlider.slider({
    change: function(event) { 
        if (event.originalEvent){
            let value = blueSlider.slider("values", 0);
            chrome.storage.sync.set({"blue": value});
        }
    }
});
coefficientSlider.slider({ 
    change: function(event) { 
        if (event.originalEvent){
            let value = coefficientSlider.slider("values", 0);
            chrome.storage.sync.set({"coefficient":value});
        }
    }
});
radiusSlider.slider({ 
    change: function(event) { 
        if (event.originalEvent){
            let value = radiusSlider.slider("values", 0);
            chrome.storage.sync.set({"radius":value});
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

//handling changes in the spectrumToggle by user
spectrumToggle.addEventListener("change", event => { 
    // if (event.originalEvent) { 
        if (spectrumToggle.checked) {
            chrome.storage.sync.set({"spectrumCycling":true});
            disableSliders();
        } else { 
            chrome.storage.sync.set({"spectrumCycling":false});
            enableSliders();
        }
    // }
});

// initialising the starting value for spectrum cycling
chrome.storage.sync.get("spectrumCycling", result => { 
    if (!result["spectrumCycling"]) { 
        chrome.storage.sync.set({"spectrumCycling":false})
        spectrumToggle.checked = false;
        enableSliders();
    } else if (result["spectrumCycling"]) { 
        spectrumToggle.checked = true;
        disableSliders();
    }
});

// writing to chrome storage when input box is changed
numBlobsInput.addEventListener("input", event=>{
        if (numBlobsInput.value > 100) { 
            chrome.storage.sync.get("numBlobs", result =>{ 
                numBlobsInput.value = result["numBlobs"]
            });
        } else if (numBlobsInput.value > 0){ 
            chrome.storage.sync.set({"numBlobs":numBlobsInput.value});
        }
});
numBlobsInput.addEventListener("focusout", event =>{ 
    if (numBlobsInput.value < 1 || isNaN(numBlobsInput.value)) { 
        chrome.storage.sync.get("numBlobs", result =>{ 
            numBlobsInput.value = result["numBlobs"];
        });
    } 
});

function disableSliders() { 
    redSlider.slider("disable");
    greenSlider.slider("disable");
    blueSlider.slider("disable");
}

function enableSliders() { 
    redSlider.slider("enable");
    greenSlider.slider("enable");
    blueSlider.slider("enable");
}