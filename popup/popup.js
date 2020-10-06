var redSlider = $(".red");
var greenSlider = $(".green");
var blueSlider = $(".blue");

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

$(".colourSlider").slider( { 
    min:0,
    max:1,
    step:0.01
})

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
