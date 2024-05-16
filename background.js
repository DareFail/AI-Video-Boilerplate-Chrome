chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "show-sidePanel",
    title: "Jamesegraph",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == "show-sidePanel") {
    chrome.tabs.sendMessage(tab.id, {
      command: "start"
    });
  }
});