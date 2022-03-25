/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { FC } from "react";

import { buttonStyles } from "./Button.styles";

interface EditButtonProps {
  readonly handleEditClick: () => void;
}
export const EditButton: FC<EditButtonProps> = ({ handleEditClick }) => {
  return (
    <button css={buttonStyles} onClick={() => handleEditClick()}>
      Edit
    </button>
  );
};
