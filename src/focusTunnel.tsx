import { blockSite, isFocusHour, isStretchBreak, unblockSite } from "./blockedSites";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BreakCountdown, startNewBreakCountdown } from "./focusTunnelBreakCountdown";

import { focusTunnelInvisible, focusTunnelVisible } from "./focusTunnel.styles";

enum SITE_STATUS {
  FocusBlocked = "Go Back to Work",
  StretchBlocked = "Go Stretch",
  UnBlocked = "Suppity Duppity",
}

// RUNS EVERY 5 seconds, CHECKS IF SITE IS BLOCKED/UNBLOCKED
const updateSiteBlockStatus = (setIsBreakAllowed: any, setBlockedStatus: any) => {
  chrome.storage.sync.get(['breakEndTime', 'nextValidBreakTime'], ({ breakEndTime, nextValidBreakTime }) => {
    let currentDate: Date = new Date();
    let currentTime = currentDate.getTime();

    let isBreakAllowed = nextValidBreakTime < currentTime;

    if (breakEndTime - currentTime > 0){
      unblockSite();
      setBlockedStatus(SITE_STATUS.UnBlocked);
    } else if (isFocusHour(currentDate)){
      blockSite();
      setBlockedStatus(SITE_STATUS.FocusBlocked);
    } else if (isStretchBreak(currentDate)){
      blockSite();
      setBlockedStatus(SITE_STATUS.StretchBlocked);
      isBreakAllowed = false;
    } else {
      unblockSite();
      setBlockedStatus(SITE_STATUS.UnBlocked);
    }

    setIsBreakAllowed(isBreakAllowed);
  });
  return;
};

export const FocusTunnel = () => {
  const [blockedStatus, setBlockedStatus] = useState(SITE_STATUS.UnBlocked);
  const [isBreakAllowed, setIsBreakAllowed] = useState(true);

  const isBlockerVisible = [SITE_STATUS.FocusBlocked, SITE_STATUS.StretchBlocked].includes(blockedStatus);

  //INTIAL STATUS CHECK + SETS TIMED CHECKS
  useEffect(() => {
    updateSiteBlockStatus(setIsBreakAllowed, setBlockedStatus);
    const timer = setInterval(() => {
      updateSiteBlockStatus(setIsBreakAllowed, setBlockedStatus);
    }, 5000);
    return () => clearInterval(timer);
  }), [setIsBreakAllowed, setBlockedStatus];

  //DECLARES STYLES
  const focusTunnelStyle = isBlockerVisible ? focusTunnelVisible : focusTunnelInvisible; //TODO: install CSS packet w/ variables;

  //FUNCTION FOR TAKE-A-BREAK BUTTON
  const triggerBreak = () => {
    startNewBreakCountdown();
    updateSiteBlockStatus(setIsBreakAllowed, setBlockedStatus);
  }

  const breakButton = isBreakAllowed ?
    <button onClick={triggerBreak}>Take a Break</button>
    : null;

  return (
    <>
      <div style={focusTunnelStyle}>
        <div>{blockedStatus}</div>
        {breakButton}
      </div>
      <BreakCountdown isActive={!isBlockerVisible} />
    </>
  );
};

export const renderFocusTunnel = () => ReactDOM.render(
  <React.StrictMode>
    <FocusTunnel />
  </React.StrictMode>,
  document.getElementById('focus-tunnel')
);