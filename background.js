console.log("background");
chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });


chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab){
    let msg = {
        txt : "received"
    }
    chrome.tabs.sendMessage(tab.id, msg);
}
