import { formatTimeToString } from "./formatTimeToString";
import { blockSite } from "./blockedSites";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { focusTunnelBreakCountdownStyles } from "./focusTunnelBreakCountdown.styles";

export const createNewBreakCountdown = () => {
  const BREAK_LENGTH_IN_MINUTES = 5;
  const NEXT_BREAK_TIME_IN_MINUTES = 60;

  const currentTime = new Date().getTime();
  const breakEndTime = currentTime + BREAK_LENGTH_IN_MINUTES*60000;
  const nextValidBreakTime = currentTime + NEXT_BREAK_TIME_IN_MINUTES*60000;

  chrome.storage.sync.set({
    breakEndTime,
    nextValidBreakTime
  });
  renderBreakCountdown();
};

export const BreakCountdown = () => {
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(0);

  useEffect(() => {
    chrome.storage.sync.get("breakEndTime", ({ breakEndTime }) => {
      let currentTime: number = new Date().getTime();
      setTimeLeftInSeconds((breakEndTime - currentTime) / 1000);
    });
  }, [setTimeLeftInSeconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeftInSeconds = timeLeftInSeconds - 5;
      if (newTimeLeftInSeconds <= 0) {
        clearInterval(interval);
        blockSite();
        //TODO: destroy this component?
      } else {
        setTimeLeftInSeconds(newTimeLeftInSeconds);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [timeLeftInSeconds]);

  return (
    <div style={focusTunnelBreakCountdownStyles}>
      <div>{formatTimeToString(timeLeftInSeconds)}</div>
    </div>
  );
};

export const renderBreakCountdown = () => ReactDOM.render(
  <React.StrictMode>
    <BreakCountdown />
  </React.StrictMode>,
  document.getElementById('focus-tunnel-countdown-root')
);
