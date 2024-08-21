chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "show-sidePanel",
    title: "Hourly Workout",
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

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.command === "muteTab") {
    chrome.tabs.update(sender.tab.id, {muted: true});
  } else if (request.command === "unmuteTab") {
    chrome.tabs.update(sender.tab.id, {muted: false});
  }
});