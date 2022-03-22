import { formatTimeToString } from "./formatTimeToString";
import React, { FC, useEffect, useState } from "react";
import { breakCountdownStyles } from "./focusTunnelBreakCountdown.styles";

export const startNewBreakCountdown = () => {
  const BREAK_LENGTH_IN_MINUTES = 5;
  const NEXT_BREAK_TIME_IN_MINUTES = 60;

  const currentTime = new Date().getTime();
  const breakEndTime = currentTime + BREAK_LENGTH_IN_MINUTES*60000;
  const nextValidBreakTime = currentTime + NEXT_BREAK_TIME_IN_MINUTES*60000;

  chrome.storage.sync.set({
    breakEndTime,
    nextValidBreakTime
  });
};

// RUNS EVERY SECOND, RUNS THE "COUNTDOWN"
const updateBreakCountdown = (interval: any, setTimeLeftInSeconds: any) => {
  chrome.storage.sync.get("breakEndTime", ({ breakEndTime }) => {
    let currentTime: number = new Date().getTime();
    let currentBreakTimeLeftInSeconds = Math.floor((breakEndTime - currentTime) / 1000);

    if (currentBreakTimeLeftInSeconds <= 0) {
      setTimeLeftInSeconds(0);
      clearInterval(interval);
      //TODO: bubble up "break end" to FocusTunnel
    } else {
      const newBreakTimeLeftInSeconds = currentBreakTimeLeftInSeconds - 5;
      setTimeLeftInSeconds(newBreakTimeLeftInSeconds);
    }
  });
  return;
};

interface BreakCountdownProps {
  readonly isActive: boolean;
}
export const BreakCountdown: FC<BreakCountdownProps> = ({ isActive }) => {
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      updateBreakCountdown(interval, setTimeLeftInSeconds)
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, setTimeLeftInSeconds]);

  return isActive ?
    (
      <div style={breakCountdownStyles}>
        <div>{formatTimeToString(timeLeftInSeconds)}</div>
      </div>
    ) :
    null;
};
