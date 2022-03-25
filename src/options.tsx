/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom";
import { BlockedSiteList } from "./components/options/BlockedSiteList";
import { rootStyles } from "./options.styles";

const Options = () => {
  //TODO: Add other global options

  return (
    <div css={rootStyles}>
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
