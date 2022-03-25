import React, { FC } from "react";

interface SaveButtonProps {
  readonly isInEditMode: boolean;
  readonly handleSaveClick: () => void;
}
export const SaveButton: FC<SaveButtonProps> = ({
  isInEditMode,
  handleSaveClick,
}) => {
  return isInEditMode ? (
    <button onClick={() => handleSaveClick()}>Save</button>
  ) : null;
};
