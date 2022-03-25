/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { ChangeEvent, FC, useState } from "react";
import { BlockedSite, OptionButtonDisplayMode } from "../../utils/types";

import { SiteName } from "./SiteName";
import { FocusHoursTable } from "./FocusHoursTable";

import { buttonWrapperStyles, listStyles } from "./BlockedSiteListItem.styles";
import { OptionsButton } from "./OptionsButton";

interface BlockedSiteListItemProps {
  readonly site: BlockedSite;
  readonly handleStorageSave: (newBlockedSites: BlockedSite[]) => void;
}
export const BlockedSiteListItem: FC<BlockedSiteListItemProps> = ({
  site,
  handleStorageSave,
}) => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [tempSiteName, setTempSiteName] = useState(site.siteName);
  const [tempFocusHours, setTempFocusHours] = useState(site.focusHours);

  const handleDeleteClick = () => {
    chrome.storage.sync.get(["blockedSites"], ({ blockedSites }) => {
      const newBlockedSites: BlockedSite[] = blockedSites.filter(
        (storedSite: BlockedSite) => storedSite.siteName !== site.siteName
      );
      chrome.storage.sync.set(
        {
          blockedSites: newBlockedSites,
        },
        () => {
          handleStorageSave(newBlockedSites);
        }
      );
    });
  };

  const handleSaveClick = () => {
    chrome.storage.sync.get(["blockedSites"], ({ blockedSites }) => {
      const newBlockedSites: BlockedSite[] = blockedSites.map(
        (storedSite: BlockedSite) =>
          storedSite.siteName === site.siteName
            ? {
                siteName: tempSiteName,
                focusHours: tempFocusHours,
                stretchBreakTime: storedSite.stretchBreakTime,
              }
            : storedSite
      );
      chrome.storage.sync.set(
        {
          blockedSites: newBlockedSites,
        },
        () => {
          setIsInEditMode(false);
          handleStorageSave(newBlockedSites);
        }
      );
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
        <OptionsButton
          label="Save"
          displayMode={OptionButtonDisplayMode.EditOnly}
          handleClick={handleSaveClick}
          isInEditMode={isInEditMode}
        />
        <OptionsButton
          label="Edit"
          displayMode={OptionButtonDisplayMode.ViewOnly}
          handleClick={() => setIsInEditMode(true)}
          isInEditMode={isInEditMode}
        />
        <OptionsButton
          label="Delete"
          displayMode={OptionButtonDisplayMode.Always}
          handleClick={handleDeleteClick}
          isInEditMode={isInEditMode}
        />
      </div>
    </li>
  );
};
