//var y;
  //chrome.storage.local.get(function(result){y = result});
  /**var div=document.createElement("div"); 
  document.body.appendChild(div); 
  div.setAttribute("id", "div12345")
  div.innerText = "test123";**/

  chrome.storage.local.get(['favoriteColor', 'likesColor'], function(data){
    var div=document.createElement("div"); 
  document.body.appendChild(div); 
  div.setAttribute("id", "div12345");
  div.innerText = "" + data.favoriteColor;
console.log("ALL DATA OR NO:" + data.likesColor)});
/**   (function () {
    var visited = window.location.href;
    var time = +new Date();
    chrome.storage.local.set({'visitedPages':{pageUrl:visited,time:time}}, function () {
        console.log("Just visited",visited)
    });
})();
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



