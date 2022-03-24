import { defaultBlockedSites } from "./utils/defaultBlockedSites";
import { BlockedSite } from "./utils/types";

let blockedSites: BlockedSite[] = defaultBlockedSites;
let currentTime: number = new Date().getTime();
let breakEndTime: number = currentTime;
let nextValidBreakTime: number = currentTime;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ blockedSites, breakEndTime, nextValidBreakTime });
});
