/**
 * Grabs the chrome local storage value and appends it to the page,
 * so the injected script.js has access to it and can read it. 
 */
chrome.storage.local.get(['input', 'checkAll'], function(data){
    var div=document.createElement("div"); 
    document.body.appendChild(div); 
    div.setAttribute("id", "input");
    div.innerText = "" + data.input;
    div.style.fontSize = "1px";
    var div1=document.createElement("div"); 
    document.body.appendChild(div1); 
    div1.setAttribute("id", "checkAll");
    div1.innerText = "" + data.checkAll;
    div1.style.fontSize = "1px";

});

/**
 * Injects script.js into the page so we can display and access the fields
 */
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



