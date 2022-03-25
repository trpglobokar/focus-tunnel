/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { FC } from "react";
import { buttonStyles } from "./Button.styles";

interface SaveButtonProps {
  readonly isInEditMode: boolean;
  readonly handleSaveClick: () => void;
}
export const SaveButton: FC<SaveButtonProps> = ({
  isInEditMode,
  handleSaveClick,
}) => {
  return isInEditMode ? (
    <button css={buttonStyles} onClick={() => handleSaveClick()}>
      Save
    </button>
  ) : null;
};
