import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BlockedSiteListItem } from "./components/options/BlockedSiteListItem";
import { BlockedSite } from "./utils/types";

const Options = () => {
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([]);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    chrome.storage.sync.get({ blockedSites }, ({ blockedSites }) => {
      setBlockedSites(blockedSites);
    });
  }, []);

  const saveOptions = () => {
    const newBlockedSites: BlockedSite[] = [];
    // Saves options to chrome.storage.sync.
    chrome.storage.sync.set(
      {
        blockedSites: newBlockedSites,
      },
      () => {
        // Update status to let user know options were saved.
        setStatus("Options saved.");
        const id = setTimeout(() => {
          setStatus("");
        }, 1000);
        return () => clearTimeout(id);
      }
    );
  };
  const SaveButton = <button onClick={saveOptions}>Save</button>;

  const BlockedSiteList = blockedSites.map((site) => (
    <BlockedSiteListItem site={site} />
  ));

  return (
    <div style={{ width: "600px" }}>
      <div>Blocked Sites:</div>
      {BlockedSiteList}
      <div>{status}</div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
