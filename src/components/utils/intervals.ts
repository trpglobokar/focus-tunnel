import { Dispatch, SetStateAction } from "react";
import { blockSite, unblockSite } from "./actions";
import { SITE_STATUS } from "./types";
import { getIsFocusHour, getIsStretchBreak } from "./utils";

type UpdateSiteBlockStatus = (
  setIsBreakAllowed: Dispatch<SetStateAction<boolean>>,
  setBlockedStatus: Dispatch<SetStateAction<SITE_STATUS>>
) => void;
export const updateSiteBlockStatus: UpdateSiteBlockStatus = (
  setIsBreakAllowed,
  setBlockedStatus
) => {
  chrome.storage.sync.get(
    ["breakEndTime", "nextValidBreakTime"],
    ({ breakEndTime, nextValidBreakTime }) => {
      let currentDate: Date = new Date();
      let currentTime = currentDate.getTime();

      let isBreakAllowed = nextValidBreakTime < currentTime;

      if (breakEndTime - currentTime > 0) {
        unblockSite();
        setBlockedStatus(SITE_STATUS.OnBreak);
      } else if (getIsFocusHour(currentDate)) {
        blockSite();
        setBlockedStatus(SITE_STATUS.FocusBlocked);
      } else if (getIsStretchBreak(currentDate)) {
        blockSite();
        setBlockedStatus(SITE_STATUS.StretchBlocked);
        isBreakAllowed = false;
      } else {
        unblockSite();
        setBlockedStatus(SITE_STATUS.TotallyFree);
      }

      setIsBreakAllowed(isBreakAllowed);
    }
  );
};

type UpdateBreakCountdown = (
  interval: NodeJS.Timer,
  setTimeLeftInSeconds: Dispatch<SetStateAction<number>>
) => void;
export const updateBreakCountdown: UpdateBreakCountdown = (
  interval,
  setTimeLeftInSeconds
) => {
  chrome.storage.sync.get("breakEndTime", ({ breakEndTime }) => {
    let currentTime: number = new Date().getTime();
    let currentBreakTimeLeftInSeconds = Math.floor(
      (breakEndTime - currentTime) / 1000
    );

    if (currentBreakTimeLeftInSeconds <= 0) {
      setTimeLeftInSeconds(0);
      clearInterval(interval);
    } else {
      setTimeLeftInSeconds(currentBreakTimeLeftInSeconds);
    }
  });
};
