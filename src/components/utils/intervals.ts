import { Dispatch, SetStateAction } from "react";
import { blockSiteBody } from "./actions";
import { SITE_STATUS } from "./types";
import {
  getBreakTimeLeftInSeconds,
  getIsFocusHour,
  getIsStretchBreak,
} from "./utils";

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
      let blockedStatus = SITE_STATUS.TotallyFree;

      if (breakEndTime - currentTime > 0) {
        blockedStatus = SITE_STATUS.OnBreak;
      } else if (getIsFocusHour(currentDate)) {
        blockedStatus = SITE_STATUS.FocusBlocked;
      } else if (getIsStretchBreak(currentDate)) {
        blockedStatus = SITE_STATUS.StretchBlocked;
        isBreakAllowed = false;
      }

      blockSiteBody(blockedStatus);
      setIsBreakAllowed(isBreakAllowed);
      setBlockedStatus(blockedStatus);
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
    const breakTimeLeftInSeconds = getBreakTimeLeftInSeconds(breakEndTime);

    if (breakTimeLeftInSeconds <= 0) {
      setTimeLeftInSeconds(0);
      clearInterval(interval);
    } else {
      setTimeLeftInSeconds(breakTimeLeftInSeconds);
    }
  });
};
