import { BlockedSite, blockedSites } from "./blockedSiteList";
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
  const blockedSite = getBlockedSiteByName(siteName);
  const currentDay = currentDate.getDay();

  return !blockedSite
    ? false
    : blockedSite.focusHours[currentDay].includes(currentDate.getHours());
};

type GetIsStretchBreak = (currentDate: Date) => boolean;
export const getIsStretchBreak: GetIsStretchBreak = (currentDate) => {
  const siteName = window.location.hostname;
  const blockedSite = getBlockedSiteByName(siteName);

  return !blockedSite
    ? false
    : currentDate.getMinutes() > blockedSite.stretchBreakTime;
};

type GetBlockedSiteByName = (siteName: string) => BlockedSite | undefined;
export const getBlockedSiteByName: GetBlockedSiteByName = (siteName) => {
  return blockedSites.find((site) => site.siteName === siteName);
};
