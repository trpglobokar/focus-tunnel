import React, { FC } from "react";

interface SaveButtonProps {
  readonly handleSaveClick: () => void;
}
export const SaveButton: FC<SaveButtonProps> = ({ handleSaveClick }) => {
  return <button onClick={() => handleSaveClick()}>Save</button>;
};
