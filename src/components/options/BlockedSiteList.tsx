import React, { FC, useEffect, useState } from "react";
import { generateNewBlockedSite } from "../../utils/defaultBlockedSites";
import { BlockedSite } from "../../utils/types";
import { BlockedSiteListItem } from "./BlockedSiteListItem";
import { OptionsButton } from "./OptionsButton";

export const BlockedSiteList: FC = () => {
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([]);

  useEffect(() => {
    chrome.storage.sync.get({ blockedSites }, ({ blockedSites }) => {
      setBlockedSites(blockedSites);
    });
  }, []);

  const addNewBlockedSite = () => {
    const newBlockedSite = generateNewBlockedSite();
    const newBlockedSites = [...blockedSites, newBlockedSite];
    chrome.storage.sync.set(
      {
        blockedSites: newBlockedSites,
      },
      () => {
        setBlockedSites(newBlockedSites);
      }
    );
  };

  return (
    <div>
      <h3>
        Blocked Sites:
        <OptionsButton
          label="Add New Blocked Site"
          handleClick={addNewBlockedSite}
        />
      </h3>
      {blockedSites.map((site) => (
        <BlockedSiteListItem
          site={site}
          handleStorageSave={(newBlockedSites: BlockedSite[]) =>
            setBlockedSites(newBlockedSites)
          }
        />
      ))}
    </div>
  );
};
