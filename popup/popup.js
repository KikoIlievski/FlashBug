console.log("hello world!")
let myButton = document.getElementById("sayHello");
myButton.onclick = function(element){
    chrome.runtime.sendMessage({"txt":"message has gone through!"})
}
$("#slider").slider( { 
    min:0,
    max:255
})
$(function(){
    $("#slider").slider({
        change: function(event, ui) { 
            let value = $("#slider").slider("values", 0 );
            console.log(value)
        }
    });
});