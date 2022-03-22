import { blockSite, isFocusHour, unblockSite } from "./blockedSites";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BreakCountdown, startNewBreakCountdown } from "./focusTunnelBreakCountdown";

import { focusTunnelInvisible, focusTunnelVisible } from "./focusTunnel.styles";

//export const renderFocusTunnel = () => {
  /*const checkIsBreakValid = () => {
    chrome.storage.sync.get("nextValidBreakTime", ({ nextValidBreakTime }) => {
      const currentTime = new Date().getTime();
      if (nextValidBreakTime > currentTime) {
        FocusTunnelBreakButton.hide();
      } else {
        FocusTunnelBreakButton.show();
      }
    });
  };*/
//};

// RUNS EVERY 5 seconds, CHECKS IF SITE IS BLOCKED/UNBLOCKED
const updateSiteBlockStatus = (setIsVisible: any) => {
  chrome.storage.sync.get("breakEndTime", ({ breakEndTime }) => {
    let currentDate: Date = new Date();
    let currentTime = currentDate.getTime();

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

  //INTIAL STATUS CHECK + SETS TIMED CHECKS
  useEffect(() => {
    updateSiteBlockStatus(setIsVisible);
    const timer = setInterval(() => {
      updateSiteBlockStatus(setIsVisible);
    }, 5000);
    return () => clearInterval(timer);
  }), [setIsVisible];

  //DECLARES STYLES
  const focusTunnelStyle = isVisible ? focusTunnelVisible : focusTunnelInvisible; //TODO: install CSS packet w/ variables;

  //FUNCTION FOR TAKE-A-BREAK BUTTON
  const triggerBreak = () => {
    unblockSite();
    setIsVisible(false);
    startNewBreakCountdown(); //TODO: pass through setIsVisible(?)
  }

  return (
    <>
      <div style={focusTunnelStyle}>
        <div>YAH BLOCKED</div>
        <button onClick={triggerBreak}>Take a Break</button>
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