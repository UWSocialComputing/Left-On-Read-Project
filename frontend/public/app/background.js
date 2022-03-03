let current_tab_object = null;

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    current_tab_object = tab;
}

chrome.tabs.onActivated.addListener(getCurrentTab)

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.query === "tab")
        console.log(request);
        // console.log(sender);d
        console.log("sendResponse: " + JSON.stringify(current_tab_object));
        console.log("title: " + current_tab_object.title);
        console.log("favIconUrl: " + current_tab_object.favIconUrl);
        
        sendResponse({url: current_tab_object.title, favURL: current_tab_object.favIconUrl});
        return true;
    }
);

