import { blockSite, isFocusHour, unblockSite } from "./blockedSites";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createNewBreakCountdown, renderBreakCountdown } from "./focusTunnelBreakCountdown";

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

const updateSiteBlockStatus = (setIsVisible: any) => {
  let currentDate: Date = new Date();
  let currentTime = currentDate.getTime();

  chrome.storage.sync.get("breakEndTime", ({ breakEndTime }) => {
    if (breakEndTime - currentTime > 0){
      renderBreakCountdown();
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

  useEffect(() => {
    updateSiteBlockStatus(setIsVisible);

    const timer = setInterval(() => {
      updateSiteBlockStatus(setIsVisible);
    }, 60000);
    return () => clearInterval(timer);
  }), [setIsVisible];

  const focusTunnelStyle = isVisible ? focusTunnelVisible : focusTunnelInvisible; //TODO: install CSS packet w/ variables;

  const triggerBreak = () => {
    unblockSite();
    setIsVisible(false);
    createNewBreakCountdown(); //TODO: pass through setIsVisible(?)
  }

  return (
    <div style={focusTunnelStyle}>
      <div>YAH BLOCKED</div>
      <button onClick={triggerBreak}>Take a Break</button>
    </div>
  );
};

export const renderFocusTunnel = () => ReactDOM.render(
  <React.StrictMode>
    <FocusTunnel />
  </React.StrictMode>,
  document.getElementById('focus-tunnel-root')
);