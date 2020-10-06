chrome.runtime.onInstalled.addListener(function() {
    console.log("BG script is running!");
});

chrome.runtime.onMessage.addListener((message)=>{
    console.log("the message recieved is: " + message.txt);
});

// chrome.storage.onChanged.addListener(function(changes, nampespace) { 
//     console.log("change detected in chrome storage; bgScript");
//     // for (var key in changes) { 
//     //   var storageChange = changes[key];
//     //   console.log(storageChange);
//     // }
//   });