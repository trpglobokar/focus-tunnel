import React, { ChangeEvent, FC, useState } from "react";
import { BlockedSite } from "../../utils/types";
import { EditButton } from "./EditButton";
import { FocusHoursTable } from "./FocusHoursTable";
import { SaveButton } from "./SaveButton";

interface BlockedSiteListItemProps {
  readonly site: BlockedSite;
}
export const BlockedSiteListItem: FC<BlockedSiteListItemProps> = ({ site }) => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [tempSiteName, setTempSiteName] = useState(site.siteName);

  const handleEditClick = () => {
    setIsInEditMode(true);
  };

  const handleSaveClick = () => {
    chrome.storage.sync.get(["blockedSites"], ({ blockedSites }) => {
      const newBlockedSites: BlockedSite[] = blockedSites.map(
        (storedSite: BlockedSite) => {
          if (storedSite.siteName === site.siteName) {
            const newBlockedSite: BlockedSite = {
              siteName: tempSiteName,
              focusHours: storedSite.focusHours,
              stretchBreakTime: storedSite.stretchBreakTime,
            };
            return newBlockedSite;
          }
          return storedSite;
        }
      );

      chrome.storage.sync.set({
        blockedSites: newBlockedSites,
      });

      setIsInEditMode(false);
    });
  };

  const onSiteNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempSiteName(e.target.value);
  };

  const SiteNameDisplay = isInEditMode ? (
    <input
      type="text"
      value={tempSiteName}
      onChange={(e) => onSiteNameInputChange(e)}
    />
  ) : (
    <span>{tempSiteName}</span>
  );

  return (
    <li key={site.siteName}>
      <label>Site Name:</label> {SiteNameDisplay}
      <br />
      <FocusHoursTable focusHours={site.focusHours} />
      <EditButton handleEditClick={handleEditClick} />
      <SaveButton handleSaveClick={handleSaveClick} />
    </li>
  );
};
