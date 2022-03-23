import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { updateSiteBlockStatus } from "./utils/intervals";
import { SITE_STATUS } from "./utils/types";
import { getIsBlockerVisible } from "./utils/utils";

import { BreakButton } from "./BreakButton";
import { BreakCountdown } from "./BreakCountdown";

import { getFocusTunnelStyles } from "./FocusTunnel.styles";

export const FocusTunnel = () => {
  const [blockedStatus, setBlockedStatus] = useState(SITE_STATUS.TotallyFree);
  const [isBreakAllowed, setIsBreakAllowed] = useState(true);

  const isBlockerVisible = getIsBlockerVisible(blockedStatus);
  const focusTunnelStyles = getFocusTunnelStyles(isBlockerVisible);

  //INTIAL STATUS CHECK + SETS TIMED CHECKS
  useEffect(() => {
    updateSiteBlockStatus(setIsBreakAllowed, setBlockedStatus);
    const timer = setInterval(() => {
      updateSiteBlockStatus(setIsBreakAllowed, setBlockedStatus);
    }, 5000);
    return () => clearInterval(timer);
  }), [setIsBreakAllowed, setBlockedStatus];

  return (
    <>
      <div style={focusTunnelStyles}>
        <div>{blockedStatus}</div>
        <BreakButton
          isBreakAllowed={isBreakAllowed}
          triggerUpdateSiteBlockStatus={() => updateSiteBlockStatus(setIsBreakAllowed, setBlockedStatus)}
        />
      </div>
      <BreakCountdown isActive={blockedStatus == SITE_STATUS.OnBreak} />
    </>
  );
};

export const renderFocusTunnel = () => ReactDOM.render(
  <React.StrictMode>
    <FocusTunnel />
  </React.StrictMode>,
  document.getElementById('focus-tunnel')
);