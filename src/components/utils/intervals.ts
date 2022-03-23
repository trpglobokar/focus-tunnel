import { blockSite, unblockSite } from "./actions";
import { SITE_STATUS } from "./types";
import { getIsFocusHour, getIsStretchBreak } from "./utils";

// RUNS EVERY 5 seconds, CHECKS IF SITE IS BLOCKED/UNBLOCKED
export const updateSiteBlockStatus = (setIsBreakAllowed: any, setBlockedStatus: any) => {
  chrome.storage.sync.get(['breakEndTime', 'nextValidBreakTime'], ({ breakEndTime, nextValidBreakTime }) => {
    let currentDate: Date = new Date();
    let currentTime = currentDate.getTime();

    let isBreakAllowed = nextValidBreakTime < currentTime;

    if (breakEndTime - currentTime > 0){
      unblockSite();
      setBlockedStatus(SITE_STATUS.OnBreak);
    } else if (getIsFocusHour(currentDate)){
      blockSite();
      setBlockedStatus(SITE_STATUS.FocusBlocked);
    } else if (getIsStretchBreak(currentDate)){
      blockSite();
      setBlockedStatus(SITE_STATUS.StretchBlocked);
      isBreakAllowed = false;
    } else {
      unblockSite();
      setBlockedStatus(SITE_STATUS.TotallyFree);
    }

    setIsBreakAllowed(isBreakAllowed);
  });
  return;
};

// RUNS EVERY SECOND, RUNS THE "COUNTDOWN"
export const updateBreakCountdown = (interval: any, setTimeLeftInSeconds: any) => {
  chrome.storage.sync.get("breakEndTime", ({ breakEndTime }) => {
    let currentTime: number = new Date().getTime();
    let currentBreakTimeLeftInSeconds = Math.floor((breakEndTime - currentTime) / 1000);

    if (currentBreakTimeLeftInSeconds <= 0) {
      setTimeLeftInSeconds(0);
      clearInterval(interval);
      //TODO: bubble up "break end" to FocusTunnel
    } else {
      setTimeLeftInSeconds(currentBreakTimeLeftInSeconds);
    }
  });
  return;
};
