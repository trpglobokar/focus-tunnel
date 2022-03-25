import React, { FC } from "react";

interface EditButtonProps {
  readonly handleEditClick: () => void;
}
export const EditButton: FC<EditButtonProps> = ({ handleEditClick }) => {
  return <button onClick={() => handleEditClick()}>Edit</button>;
};
