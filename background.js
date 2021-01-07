console.log("background");
chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });


//checks whether or not the user clicked on the extension button, so we can
//call the rest api request to display xml data
chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab){
    let msg = {
        txt : "received"
    }
    chrome.tabs.sendMessage(tab.id, msg);
}
