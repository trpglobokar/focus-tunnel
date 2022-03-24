import { BlockedSite, SITE_STATUS } from "./types";

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

type GetIsFocusHour = (
  blockedSite: BlockedSite | undefined,
  currentDate: Date
) => boolean;
export const getIsFocusHour: GetIsFocusHour = (blockedSite, currentDate) => {
  const currentDay = currentDate.getDay();

  return !blockedSite
    ? false
    : blockedSite.focusHours[currentDay].includes(currentDate.getHours());
};

type GetIsStretchBreak = (
  blockedSite: BlockedSite | undefined,
  currentDate: Date
) => boolean;
export const getIsStretchBreak: GetIsStretchBreak = (
  blockedSite,
  currentDate
) => {
  return !blockedSite
    ? false
    : currentDate.getMinutes() > blockedSite.stretchBreakTime;
};

type GetBlockedSiteByName = (
  blockedSites: BlockedSite[],
  siteName: string
) => BlockedSite | undefined;
export const getBlockedSiteByName: GetBlockedSiteByName = (
  blockedSites,
  siteName
) => {
  return blockedSites.find((site) => site.siteName === siteName);
};
