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

  const syncAndSetBlockedSites = (updatedBlockedSites: BlockedSite[]) => {
    chrome.storage.sync.set(
      {
        blockedSites: updatedBlockedSites,
      },
      () => {
        setBlockedSites(updatedBlockedSites);
      }
    );
  };

  const addNewBlockedSite = () => {
    const newBlockedSite = generateNewBlockedSite();
    const updatedBlockedSites = [...blockedSites, newBlockedSite];
    syncAndSetBlockedSites(updatedBlockedSites);
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
      <ul>
        {blockedSites.map((site) => (
          <BlockedSiteListItem
            site={site}
            key={site.id}
            handleStorageDelete={(deletedSiteId: string) => {
              const updatedSites = [...blockedSites].filter(
                (site) => site.id != deletedSiteId
              );
              syncAndSetBlockedSites(updatedSites);
            }}
            handleStorageSave={(updatedSite: BlockedSite) => {
              const updatedBlockedSites: BlockedSite[] = blockedSites.map(
                (storedSite: BlockedSite) =>
                  storedSite.id === site.id ? updatedSite : storedSite
              );
              syncAndSetBlockedSites(updatedBlockedSites);
            }}
          />
        ))}
      </ul>
    </div>
  );
};
