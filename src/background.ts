let breakEndTime: number = 0;
let nextValidBreakTime: number = 0;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ breakEndTime, nextValidBreakTime });
});