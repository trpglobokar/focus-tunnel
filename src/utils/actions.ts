import {
  BREAK_LENGTH_IN_MINUTES,
  NEXT_BREAK_TIME_IN_MINUTES,
  SITE_STATUS,
} from "./types";
import { getIsBlockerVisible } from "./utils";

type BlockSiteBody = (blockedStatus: SITE_STATUS) => void;
export const blockSiteBody: BlockSiteBody = (blockedStatus) => {
  const isSiteBlocked = getIsBlockerVisible(blockedStatus);

  document.getElementsByTagName("body")[0].style.display = isSiteBlocked
    ? "none"
    : "initial";
};

export const startNewBreakCountdown = () => {
  const currentTime = new Date().getTime();

  chrome.storage.sync.get(["breakLength", "breakGapLength"], ({ breakLength, breakGapLength }) => {
    const breakEndTime = currentTime + breakLength * 60000;
    const nextValidBreakTime = currentTime + breakGapLength * 60000;

    chrome.storage.sync.set({
      breakEndTime,
      nextValidBreakTime,
    });
  });
};
