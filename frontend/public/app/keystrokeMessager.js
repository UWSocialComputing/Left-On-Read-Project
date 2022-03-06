function sendKeydown() {
  chrome.runtime.sendMessage("keydown");
}

document.addEventListener("keydown", sendKeydown);
