// document.getElementById("getRed").addEventListener("click", function(element) { 
//     chrome.storage.sync.get("red", function(result){ 
//         console.log("Value read for red is " + result["red"])
//     });
// });

$(".colourSlider").slider( { 
    min:0,
    max:255
})

var redSlider = $(".red");
var greenSlider = $(".green");
var blueSlider = $(".blue");

redSlider.slider({
    change: function(event, ui) { 
        value = redSlider.slider("values", 0);
        chrome.storage.sync.set({"red": value});
    }
});
greenSlider.slider({
    change: function(event, ui) { 
        value = greenSlider.slider("values", 0);
        chrome.storage.sync.set({"green": value});
    }
});
blueSlider.slider({
    change: function(event, ui) { 
        value = blueSlider.slider("values", 0);
        chrome.storage.sync.set({"blue": value});
    }
});
