import { blockedSites } from "./blockedSiteList";

export const blockSite = () => {
  document.getElementsByTagName('body')[0].style.display = 'none';
};

export const unblockSite = () => {
  document.getElementsByTagName('body')[0].style.display = 'initial';
};

export const isFocusHour = (currentDate: Date) => {
  const siteName = window.location.hostname;
  const currentHour = currentDate.getHours();
  const currentDay = currentDate.getDay();

  if(!blockedSites[siteName]){
    return false;
  }
  return blockedSites[siteName].focusHours[currentDay].includes(currentHour)
};

export const isStretchBreak = (currentDate: Date) => {
  const siteName = window.location.hostname;

  if(!blockedSites[siteName]){
    return false;
  }
  return currentDate.getMinutes() > blockedSites[siteName].stretchBreakTime;
}
