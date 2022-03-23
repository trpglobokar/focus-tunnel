import React, { FC } from "react";

import { startNewBreakCountdown } from "./utils/actions";

import { breakButtonStyles } from "./BreakButton.styles";

interface BreakButtonProps {
  readonly isBreakAllowed: boolean;
  readonly triggerUpdateSiteBlockStatus: () => void;
}
export const BreakButton: FC<BreakButtonProps> = ({ isBreakAllowed, triggerUpdateSiteBlockStatus }) => {
  const triggerBreak = () => {
    startNewBreakCountdown();
    triggerUpdateSiteBlockStatus();
  };

  return isBreakAllowed ? (
    <button style={breakButtonStyles} onClick={triggerBreak}>
        Take a Break
    </button>
    ) : null;
};
