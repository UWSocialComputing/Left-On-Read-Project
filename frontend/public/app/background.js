class KeystrokeLogger {
  constructor() {
    let sampleStartTime = Date.now();
    let clicksArray = [];

    this.logKeystroke = function () {
      clicksArray.push(Date.now() - sampleStartTime);
    };

    this.reset = function () {
      clicksArray = [];
      sampleStartTime = Date.now(); // reset the staritng time
    };

    this.getArray = function () {
      return clicksArray;
    };

    this.toString = function () {
      return "[" + this.getArray().toString() + "]";
    };
  }
}

let currentTabData = createTabDataObject(null);
const PUT_TIME = 1000;
const USER_NAME = "LOR_USER";
const sendDataURL = "https://twyd.herokuapp.com/status/" + USER_NAME + "/";
const KR = new KeystrokeLogger();

// tab grabber
async function queryCurrentTabData() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  currentTabData = createTabDataObject(tab);
}

chrome.tabs.onActivated.addListener(queryCurrentTabData);

function createTabDataObject(tab) {
  let domain = "";
  let favIconUrl = "";

  console.dir(tab);
  try {
    domain = domain = new URL(tab.url.toString()).hostname.replace("www.", "");
    favIconUrl = tab.favIconUrl;
  } catch (e) {
    domain = "chrome";
  }

  if (favIconUrl === "" || tab.favIconUrl == undefined) {
    favIconUrl = "https://developer.chrome.com/images/meta/favicon-32x32.png";
  }

  return { url: domain, favUrl: favIconUrl };
}

// browser message listener
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request === "keydown") {
    KR.logKeystroke();
  } else {
    console.log("BRUH");
    console.log(request);
  }

  return true;
});

setInterval(() => {
  let userData = {
    current_tab: JSON.stringify(currentTabData),
    keyboard_activity: KR.toString(),
  };

  // reset the logger after storing data in userData
  KR.reset();

  fetch(sendDataURL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": "",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}, PUT_TIME);
