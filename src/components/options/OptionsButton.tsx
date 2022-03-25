/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { FC } from "react";
import { OptionButtonDisplayMode } from "../../utils/types";
import { buttonStyles } from "./Button.styles";

interface OptionsButtonProps {
  readonly label: string;
  readonly handleClick: () => void;
  readonly displayMode?: OptionButtonDisplayMode;
  readonly isInEditMode?: boolean;
}
export const OptionsButton: FC<OptionsButtonProps> = ({
  label,
  handleClick,
  displayMode = OptionButtonDisplayMode.Always,
  isInEditMode = false,
}) => {
  const optionsButton = (
    <button css={buttonStyles} onClick={() => handleClick()}>
      {label}
    </button>
  );

  switch (displayMode) {
    case OptionButtonDisplayMode.EditOnly:
      return isInEditMode ? optionsButton : null;
    case OptionButtonDisplayMode.ViewOnly:
      return !isInEditMode ? optionsButton : null;
    case OptionButtonDisplayMode.Always:
    default:
      return optionsButton;
  }
};
