current_tab_object = null

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    current_tab_object = tab
}

chrome.tabs.onActivated.addListener(getCurrentTab)

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.query === "tab")
        sendResponse(current_tab_object);
    }
);