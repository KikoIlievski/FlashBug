console.log("hello world!")
let myButton = document.getElementById("sayHello");
myButton.onclick = function(element){
    chrome.runtime.sendMessage({"txt":"message has gone through!"})
}
$(function(){
    $("#slider").slider();
});