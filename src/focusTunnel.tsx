import { blockSite, isFocusHour, unblockSite } from "./blockedSites";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BreakCountdown, startNewBreakCountdown } from "./focusTunnelBreakCountdown";

import { focusTunnelInvisible, focusTunnelVisible } from "./focusTunnel.styles";

// RUNS EVERY 5 seconds, CHECKS IF SITE IS BLOCKED/UNBLOCKED
const updateSiteBlockStatus = (setIsVisible: any, setIsBreakAllowed: any) => {
  chrome.storage.sync.get(['breakEndTime', 'nextValidBreakTime'], ({ breakEndTime, nextValidBreakTime }) => {
    let currentDate: Date = new Date();
    let currentTime = currentDate.getTime();

    const isBreakAllowed = nextValidBreakTime < currentTime;
    setIsBreakAllowed(isBreakAllowed);

    //TODO: only change values if already changed? or does react handle this
    if (breakEndTime - currentTime > 0){
      unblockSite();
      setIsVisible(false);
    } else if (isFocusHour(currentDate)){
      blockSite();
      setIsVisible(true);
    } else {
      unblockSite();
      setIsVisible(false);
    }
  });
  return;
};

export const FocusTunnel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isBreakAllowed, setIsBreakAllowed] = useState(true);

  //INTIAL STATUS CHECK + SETS TIMED CHECKS
  useEffect(() => {
    updateSiteBlockStatus(setIsVisible, setIsBreakAllowed);
    const timer = setInterval(() => {
      updateSiteBlockStatus(setIsVisible, setIsBreakAllowed);
    }, 5000);
    return () => clearInterval(timer);
  }), [setIsVisible, setIsBreakAllowed];

  //DECLARES STYLES
  const focusTunnelStyle = isVisible ? focusTunnelVisible : focusTunnelInvisible; //TODO: install CSS packet w/ variables;

  //FUNCTION FOR TAKE-A-BREAK BUTTON
  const triggerBreak = () => {
    unblockSite();
    setIsVisible(false);
    startNewBreakCountdown(); //TODO: pass through setIsVisible(?)
  }

  const breakButton = isBreakAllowed ?
    <button onClick={triggerBreak}>Take a Break</button>
    : null;

  return (
    <>
      <div style={focusTunnelStyle}>
        <div>YAH BLOCKED</div>
        {breakButton}
      </div>
      <BreakCountdown isActive={!isVisible} />
    </>
  );
};

export const renderFocusTunnel = () => ReactDOM.render(
  <React.StrictMode>
    <FocusTunnel />
  </React.StrictMode>,
  document.getElementById('focus-tunnel')
);