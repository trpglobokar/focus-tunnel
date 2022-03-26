/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom";
import { BlockedSiteList } from "./components/options/BlockedSiteList";
import { GlobalSettings } from "./components/options/GlobalSettings";
import { rootStyles } from "./options.styles";

const Options = () => {
  return (
    <div css={rootStyles}>
      <GlobalSettings />
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
