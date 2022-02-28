chrome.runtime.sendMessage({query: "tab"}, function(response) {
    console.log(response);
  });