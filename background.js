chrome.runtime.onInstalled.addListener(function() {
    console.log("Yeet");
});

chrome.runtime.onMessage.addListener((message)=>{
    console.log("the message recieved is: " + message.txt);
});