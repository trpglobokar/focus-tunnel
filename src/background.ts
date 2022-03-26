import { defaultBlockedSites } from "./utils/defaultBlockedSites";
import { BlockedSite, BREAK_LENGTH_IN_MINUTES, NEXT_BREAK_TIME_IN_MINUTES } from "./utils/types";

const currentTime: number = new Date().getTime();

const blockedSites: BlockedSite[] = defaultBlockedSites;
const breakEndTime: number = currentTime;
const nextValidBreakTime: number = currentTime;
const breakLength: number = BREAK_LENGTH_IN_MINUTES;
const breakGapLength: number = NEXT_BREAK_TIME_IN_MINUTES;


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ blockedSites, breakEndTime, breakLength, breakGapLength, nextValidBreakTime });
});
