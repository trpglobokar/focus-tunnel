/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { ChangeEvent, FC, useState } from "react";
import { BlockedSite } from "../../utils/types";

import { SiteName } from "./SiteName";
import { EditButton } from "./EditButton";
import { FocusHoursTable } from "./FocusHoursTable";
import { SaveButton } from "./SaveButton";

import { buttonWrapperStyles, listStyles } from "./BlockedSiteListItem.styles";

interface BlockedSiteListItemProps {
  readonly site: BlockedSite;
}
export const BlockedSiteListItem: FC<BlockedSiteListItemProps> = ({ site }) => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [tempSiteName, setTempSiteName] = useState(site.siteName);
  const [tempFocusHours, setTempFocusHours] = useState(site.focusHours);

  const handleSaveClick = () => {
    chrome.storage.sync.get(["blockedSites"], ({ blockedSites }) => {
      const newBlockedSites: BlockedSite[] = blockedSites.map(
        (storedSite: BlockedSite) => {
          if (storedSite.siteName === site.siteName) {
            const newBlockedSite: BlockedSite = {
              siteName: tempSiteName,
              focusHours: tempFocusHours,
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

  return (
    <li css={listStyles} key={site.siteName}>
      <SiteName
        isInEditMode={isInEditMode}
        siteName={tempSiteName}
        handleOnSiteNameChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTempSiteName(e.target.value)
        }
      />
      <FocusHoursTable
        isInEditMode={isInEditMode}
        focusHours={tempFocusHours}
        handleFocusHourChange={(newFocusHours) => {
          setTempFocusHours(newFocusHours);
        }}
      />
      <div css={buttonWrapperStyles}>
        <SaveButton
          isInEditMode={isInEditMode}
          handleSaveClick={handleSaveClick}
        />
        <EditButton
          handleEditClick={() => {
            setIsInEditMode(true);
          }}
        />
      </div>
    </li>
  );
};
