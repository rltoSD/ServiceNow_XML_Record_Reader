chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse){
    console.log(message.txt);
    if(message.txt == "received"){
            var s = document.createElement('script');
            // TODO: add "script.js" to web_accessible_resources in manifest.json
            s.src = chrome.extension.getURL('script.js');
            s.onload = function () {
                this.remove();
            };
            (document.head || document.documentElement).appendChild(s);        
    }
}



