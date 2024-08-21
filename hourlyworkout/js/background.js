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


chrome.runtime.onInstalled.addListener(() => {
  // create alarm after extension is installed / upgraded
  chrome.alarms.create("hourlyAlarm", {
    periodInMinutes: 60,
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "hourlyAlarm") {
    chrome.tabs.sendMessage(tab.id, {
      command: "start"
    });
  }
});