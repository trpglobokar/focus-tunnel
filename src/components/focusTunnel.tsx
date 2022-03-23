import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { startNewBreakCountdown } from "./utils/actions";
import { updateSiteBlockStatus } from "./utils/intervals";
import { SITE_STATUS } from "./utils/types";

import { BreakCountdown } from "./BreakCountdown";
import { getFocusTunnelStyles } from "./FocusTunnel.styles";

export const FocusTunnel = () => {
  const [blockedStatus, setBlockedStatus] = useState(SITE_STATUS.UnBlocked);
  const [isBreakAllowed, setIsBreakAllowed] = useState(true);

  const isBlockerVisible = [SITE_STATUS.FocusBlocked, SITE_STATUS.StretchBlocked].includes(blockedStatus);
  const focusTunnelStyles = getFocusTunnelStyles(isBlockerVisible);

  //INTIAL STATUS CHECK + SETS TIMED CHECKS
  useEffect(() => {
    updateSiteBlockStatus(setIsBreakAllowed, setBlockedStatus);
    const timer = setInterval(() => {
      updateSiteBlockStatus(setIsBreakAllowed, setBlockedStatus);
    }, 5000);
    return () => clearInterval(timer);
  }), [setIsBreakAllowed, setBlockedStatus];
  
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
      <div style={focusTunnelStyles}>
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