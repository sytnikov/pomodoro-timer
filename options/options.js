const timeOptionInput = document.getElementById("notification-input");
timeOptionInput.addEventListener("change", (event) => {
  const val = event.target.value;
  if (val < 1 || val > 60) {
    timeOptionInput.value = 25;
    alert("Notification Time value should not be less than 1 or more than 60");
  }
});

const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
  const timeOption = timeOptionInput.value;
  chrome.storage.local.set({
    timeOption,
    timer: 0,
    isRunning: false,
  });
});

// default value for timeOptionInput field
chrome.storage.local.get(["timeOption"], (res) => {
  timeOptionInput.value = res.timeOption;
});
