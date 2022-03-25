/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BlockedSiteList } from "./components/options/BlockedSiteList";
import { rootStyles } from "./options.styles";
import {
  BREAK_LENGTH_IN_MINUTES,
  NEXT_BREAK_TIME_IN_MINUTES,
} from "./utils/types";

const Options = () => {
  //TODO: Make global settings user editable

  return (
    <div css={rootStyles}>
      <h3>Global Settings:</h3>
      <div>Break Length: {BREAK_LENGTH_IN_MINUTES} minutes</div>
      <div>Time Between Breaks: {NEXT_BREAK_TIME_IN_MINUTES} minutes</div>
      <br />
      <BlockedSiteList />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
