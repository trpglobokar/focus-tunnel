import { blockedSites } from "./blockedSiteList";
import { SITE_STATUS } from "./types";

type GetBreakTimeLeftInSeconds = (breakEndTime: number) => number;
export const getBreakTimeLeftInSeconds: GetBreakTimeLeftInSeconds = (
  breakEndTime
) => {
  let currentTime: number = new Date().getTime();
  return Math.floor((breakEndTime - currentTime) / 1000);
};

type GetIsBlockerVisible = (blockedStatus: SITE_STATUS) => boolean;
export const getIsBlockerVisible: GetIsBlockerVisible = (blockedStatus) =>
  [SITE_STATUS.FocusBlocked, SITE_STATUS.StretchBlocked].includes(
    blockedStatus
  );

type GetIsFocusHour = (currentDate: Date) => boolean;
export const getIsFocusHour: GetIsFocusHour = (currentDate) => {
  const siteName = window.location.hostname;
  const currentHour = currentDate.getHours();
  const currentDay = currentDate.getDay();

  if (!blockedSites[siteName]) {
    return false;
  }
  return blockedSites[siteName].focusHours[currentDay].includes(currentHour);
};

type GetIsStretchBreak = (currentDate: Date) => boolean;
export const getIsStretchBreak: GetIsStretchBreak = (currentDate) => {
  const siteName = window.location.hostname;

  if (!blockedSites[siteName]) {
    return false;
  }
  return currentDate.getMinutes() > blockedSites[siteName].stretchBreakTime;
};
