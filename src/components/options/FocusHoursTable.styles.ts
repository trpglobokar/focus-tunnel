import { CSSObject } from "@emotion/react";

const UNBLOCKED_GREEN = "175 215 175";
const BLOCKED_RED = "216 90 90";

type GetTableStyles = (isInEditMode: boolean) => CSSObject;
export const getTableStyles: GetTableStyles = (isInEditMode) => {
  const hoverOpacity = isInEditMode ? "60%" : "100%";

  return {
    fontSize: isInEditMode ? "12px" : "6px",
    borderSpacing: 0,
    marginBottom: "4px",
    marginLeft: "12px",
    ":hover": {
      cursor: isInEditMode ? "pointer" : "initial",
    },
    td: {
      width: isInEditMode ? "17px" : "7px",
      height: isInEditMode ? "14px" : "5px",
    },
    "td[data-isBlocked=true]": {
      background: `rgb(${BLOCKED_RED} / 100%)`,
      border: "1px solid #9b0000",
      ":hover": {
        background: `rgb(${BLOCKED_RED} / ${hoverOpacity})`,
      },
    },
    "td[data-isBlocked=false]": {
      background: `rgb(${UNBLOCKED_GREEN} / 100%)`,
      border: "1px solid #75a875",
      ":hover": {
        background: `rgb(${UNBLOCKED_GREEN} / ${hoverOpacity})`,
      },
    },
  };
};
