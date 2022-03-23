import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BlockedSite } from "./components/utils/blockedSiteList";

//TODO: allow users to customize blocked sites & times here

const WEEK_DAYS = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const formatFocusHours = (focusHours: number[][]) => {
  const listForm = focusHours.map((day, index) => (
    <li key={index}>
      {WEEK_DAYS[index]}: {day.join(",")}
    </li>
  ));

  return <ul>{listForm}</ul>;
};

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
    <li key={site.siteName}>
      {site.siteName}
      <br />
      {formatFocusHours(site.focusHours)}
    </li>
  ));

  return (
    <>
      <div>Blocked Sites:</div>
      {BlockedSiteList}
      <div>{status}</div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById("root")
);
