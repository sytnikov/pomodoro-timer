chrome.storage.local.set({
  timer: 0,
});

// we need alarm so that service worker doesn't become idle when extension isn't active
chrome.alarms.create("pomodoro-timer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoro-timer") {
    chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        let isRunning = true;
        const timeOption = parseInt(res.timeOption);
        if (timer === timeOption * 60) {
          this.registration.showNotification("Pomodoro Timer", {
            body: `${timeOption} minutes have passed. Take a break!`,
            icon: "icon.png",
          });
          timer = 0;
          isRunning = false;
        }
        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

chrome.storage.local.get(["timer", "isRunning"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    isRunning: "isRunning" in res ? res.isRunning : false,
    timeOption: "timeOption" in res ? res.timeOption : 25,
  });
});
