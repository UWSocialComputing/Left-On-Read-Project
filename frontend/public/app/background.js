let current_tab_object = null;

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  current_tab_object = tab;
}

chrome.tabs.onActivated.addListener(getCurrentTab);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request === "tab") {
      console.log("res from sendResponse: " + JSON.stringify(current_tab_object));

      if (current_tab_object == null) {
        sendResponse({
          url: "chrome",
          favURL: "https://www.google.com/favicon.ico",
        });
        return true;
      }
  
      sendResponse({
        url: current_tab_object.url,
        favURL: current_tab_object.favIconUrl,
      });

    }
    
  return true;
});
