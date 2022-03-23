import React, { FC, useEffect, useState } from "react";

import { formatTimeToString } from "../utils/formatTimeToString";
import { updateBreakCountdown } from "../utils/intervals";

import { breakCountdownStyles } from "./BreakCountdown.styles";

interface BreakCountdownProps {
  readonly isActive: boolean;
}
export const BreakCountdown: FC<BreakCountdownProps> = ({ isActive }) => {
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      updateBreakCountdown(interval, setTimeLeftInSeconds);
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, setTimeLeftInSeconds]);

  return isActive ? (
    <div style={breakCountdownStyles}>
      <div>{formatTimeToString(timeLeftInSeconds)}</div>
    </div>
  ) : null;
};
