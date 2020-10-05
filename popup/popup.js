document.getElementById("setRed").addEventListener("click", ()=>{
    chrome.storage.sync.set({"red":100}, ()=> {{ 
        console.log("Value of red has been set to 100");
    }});
})


document.getElementById("getRed").addEventListener("click", function(element) { 
    chrome.storage.sync.get("red", function(result){ 
        console.log("Value read for red is " + result["red"])
    });
});

$("#slider").slider( { 
    min:0,
    max:255
})

$("#slider").slider({
    change: function(event, ui) { 
        let value = $("#slider").slider("values", 0);
        chrome.storage.sync.set({"red":value});
    }
});
